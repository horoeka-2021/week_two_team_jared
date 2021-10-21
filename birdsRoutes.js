const express = require('express')
const utils = require('./utils')
// const { stringify } = require('querystring')

const router = express.Router()

module.exports = router

router.get('/:id', (req, res) => {
  const fileName = 'birdData.json'
  utils.getData(fileName, (err, parses) => {
    if (err) {
      res.status(500).send('Sorry we could not find what you were looking for')
      return
    }
    const id = req.params.id
    const birdArray = parses.birds
    const birdObject = birdArray.find(element => element.id === Number(id))
    res.render('details', birdObject)
  })
})

// edit route
router.get('/:id/edit', (req, res) => {
  const fileName = 'birdData.json'
  utils.getData(fileName, (err, parses) => {
    if (err) {
      res.status(500).send('Sorry we could not find what you were looking for')
      return
    }
    const id = req.params.id
    const birdArray = parses.puppies
    const birdObject = birdArray.find(element => element.id === Number(id))
    res.render('edit', birdObject)
  })
})

// post route for edit
router.post('/:id/edit', (req, res) => {
  const newAnimal = req.body
  const id = Number(req.params.id)
  newAnimal.id = id

  // read in json file and locate puppy
  const fileName = 'birdData.json'
  utils.getData(fileName, (err, data) => {
    if (err) {
      res.status(500).send('Sorry we could not find what you were looking for')
      return
    }
    const newArr = [...data.birds.filter(bird => bird.id !== id), newAnimal]
    const newData = { birds: newArr }
    // console.log(newData)

    utils.editData('birdData.json', newData, (err) => {
      if (err) {
        res.status(500).send('bird mods were not saved to file :(')
        return
      }
      // console.log('succes?')
      res.redirect(`/birds/${id}`)
    })
  })
})
