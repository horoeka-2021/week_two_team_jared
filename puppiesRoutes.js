const express = require('express')
const utils = require('./utils')
// const { stringify } = require('querystring')

const router = express.Router()

module.exports = router

router.get('/:id', (req, res) => {
  const fileName = 'data.json'
  utils.getData(fileName, (err, parses) => {
    if (err) {
      res.status(500).send('woof woof where are you?')
      return
    }
    const id = req.params.id
    const puppyArray = parses.puppies
    const puppyObject = puppyArray.find(element => element.id === Number(id))
    const vies = puppyObject
    res.render('details', vies)
  })
})

// edit route
router.get('/:id/edit', (req, res) => {
  const fileName = 'data.json'
  utils.getData(fileName, (err, parses) => {
    if (err) {
      res.status(500).send('woof woof where are you?')
      return
    }
    const id = req.params.id
    const puppyArray = parses.puppies
    const puppyObject = puppyArray.find(element => element.id === Number(id))
    const vies = puppyObject
    res.render('edit', vies)
  })
})

// post route for edit
router.post('/:id/edit', (req, res) => {
  const newAnimal = req.body
  const id = Number(req.params.id)
  newAnimal.id = id

  // read in json file and locate puppy
  const fileName = 'data.json'
  utils.getData(fileName, (err, data) => {
    if (err) {
      res.status(500).send('woof woof where are you?')
      return
    }
    const newArr = [...data.puppies.filter(puppy => puppy.id !== id), newAnimal]
    const newData = { puppies: newArr }
    // console.log(newData)

    utils.editData('data.json', newData, (err) => {
      if (err) {
        res.status(500).send('Puppy mods were not saved to file :(')
        return
      }
      // console.log('succes?')
      res.redirect(`/puppies/${id}`)
    })
  })
})
