const express = require('express')
const path = require('path')
const fs = require('fs')
const puppies = require('./utils')
// const { stringify } = require('querystring')

const router = express.Router()

module.exports = router

router.get('/:id', (req, res) => {
  puppies.getData((err, parses) => {
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
  puppies.getData((err, parses) => {
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
  const newPuppy = req.body
  const id = Number(req.params.id)
  newPuppy.id = id

  // read in json file and locate puppy
  puppies.getData((err, data) => {
    if (err) {
      res.status(500).send('woof woof where are you?')
      return
    }
    const newArr = [...data.puppies.filter(puppy => puppy.id !== id), newPuppy]
    const newData = { puppies: newArr }
    // console.log(newData)

    puppies.editData('data.json', newData, (err) => {
      if (err) {
        res.status(500).send('Puppy mods were not saved to file :(')
        return
      }
      // console.log('succes?')
      res.redirect(`/puppies/${id}`)
    })
  })
})
