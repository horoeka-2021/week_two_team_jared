const express = require('express')
const utils = require('./utils')
const router = express.Router()

module.exports = router
// Go to add sighting bird page
router.get('/add-sighting', (req, res) => {
  const fileName = 'homepageBirds.json'
  utils.getData(fileName, (err, parses) => {
    if (err) {
      res.status(500).send('Sorry we could not find what you were looking for')
      return
    }
    const viewData = parses
    // console.log(viewData)
    res.render('bird-edit', viewData)
  })
})

// post route for edit
router.post('/add-sighting', (req, res) => {
  console.log('add-sighting')
  // define new cat
  const newAnimal = { ...req.body }
  // console.log(newAnimal)
  // // read in json file
  const fileName = 'homepageBirds.json'
  utils.getData(fileName, (err, data) => {
    if (err) {
      res.status(500).send('Sorry we could not find what you were looking for')
      return
    }

    // Match species of received to species of bird
    const index = data.birds.findIndex(element => {
      if (element.species === newAnimal.species) {
        return true
      }
    })

    data.birds[index].sightings.push(newAnimal)

    // const newArr = [...data.cats, newAnimal]
    // const newData = { cats: newArr }

    utils.editData('homepageBirds.json', data, (err) => {
      if (err) {
        res.status(500).send('cat mods were not saved to file :(')
        return
      }
      // console.log('succes?')
      res.redirect(`/birds/${data.birds[index].id}`)
    })
  })
})

router.get('/:id', (req, res) => {
  const fileName = 'homepageBirds.json'
  utils.getData(fileName, (err, parses) => {
    if (err) {
      res.status(500).send('Sorry we could not find what you were looking for')
      return
    }
    const id = req.params.id
    const birdArray = parses.birds
    const birdObject = birdArray.find(element => element.id === Number(id))
    res.render('bird-details', birdObject)
  })
})

// edit route
router.get('/:id/edit', (req, res) => {
  const fileName = 'homepageBirds.json'
  utils.getData(fileName, (err, parses) => {
    if (err) {
      res.status(500).send('Sorry we could not find what you were looking for')
      return
    }
    const id = req.params.id
    const birdArray = parses.birds
    const birdObject = birdArray.find(element => element.id === Number(id))
    res.render('edit', birdObject)
  })
})

// post route for edit
router.post('/:id/edit', (req, res) => {
  const newAnimal = req.body
  const id = Number(req.params.id)
  newAnimal.id = id

  // read in json file and locate bird
  const fileName = 'homepageBirds.json'
  utils.getData(fileName, (err, data) => {
    if (err) {
      res.status(500).send('Sorry we could not find what you were looking for')
      return
    }
    const newArr = [...data.birds.filter(bird => bird.id !== id), newAnimal]
    const newData = { birds: newArr }

    utils.editData('homepageBirds.json', newData, (err) => {
      if (err) {
        res.status(500).send('bird mods were not saved to file :(')
        return
      }
      res.redirect(`/birds/${id}`)
    })
  })
})
