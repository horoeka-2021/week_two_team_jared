const express = require('express')
const utils = require('./utils')
// const { stringify } = require('querystring')

const router = express.Router()

module.exports = router

// Cat sightings
router.get('/sightings', (req, res) => {
  const fileName = 'catData.json'
  utils.getData(fileName, (err, parsedData) => {
    if (err) {
      res.status(500).send('Sorry we could not find what you were looking for')
      return
    }
    const viewData = {
      cats: parsedData.cats
    }
    res.render('catHome', viewData)
  })
})

// displays an individual cat
router.get('/:id', (req, res) => {
  const fileName = 'catData.json'
  utils.getData(fileName, (err, parses) => {
    if (err) {
      res.status(500).send('Sorry we could not find what you were looking for')
      return
    }
    const id = req.params.id
    const catArray = parses.cats
    const catObject = catArray.find(element => element.id === Number(id))
    res.render('cat-details', catObject)
  })
})

// edit route
router.get('/:id/edit', (req, res) => {
  const fileName = 'catData.json'
  utils.getData(fileName, (err, parses) => {
    if (err) {
      res.status(500).send('Sorry we could not find what you were looking for')
      return
    }
    const id = req.params.id
    const catArray = parses.cats
    const catObject = catArray.find(element => element.id === Number(id))
    res.render('catEdit', catObject)
  })
})

// post route for edit
router.post('/:id/edit', (req, res) => {
  const newAnimal = req.body
  const id = Number(req.params.id)
  newAnimal.id = id

  // read in json file and locate puppy
  const fileName = 'catData.json'
  utils.getData(fileName, (err, data) => {
    if (err) {
      res.status(500).send('Sorry we could not find what you were looking for')
      return
    }
    const newArr = [...data.cats.filter(cat => cat.id !== id), newAnimal]
    const newData = { cats: newArr }
    // console.log(newData)

    utils.editData('catData.json', newData, (err) => {
      if (err) {
        res.status(500).send('cat mods were not saved to file :(')
        return
      }
      // console.log('succes?')
      res.redirect(`/cats/${id}`)
    })
  })
})
