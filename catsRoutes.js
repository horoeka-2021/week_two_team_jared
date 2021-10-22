const express = require('express')
const utils = require('./utils')

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

// register a cat
router.get('/register', (req, res) => {
  res.render('catRegister')
})

// post route for edit
router.post('/registering', (req, res) => {
  console.log('registering')
  // define new cat
  const newAnimal = req.body

  // // read in json file
  const fileName = 'catData.json'
  utils.getData(fileName, (err, data) => {
    if (err) {
      res.status(500).send('Sorry we could not find what you were looking for')
      return
    }
    // create new id
    // find highest id currently
    let id = 0
    id = data.cats.reduce((acc, current) => {
      if (current.id > acc) {
        return current.id
      }
      return acc
    }, 0)

    // setting id up
    newAnimal.id = id + 1

    const newArr = [...data.cats, newAnimal]
    const newData = { cats: newArr }

    utils.editData('catData.json', newData, (err) => {
      if (err) {
        res.status(500).send('cat mods were not saved to file :(')
        return
      }
      res.redirect(`/cats/${id + 1}`)
    })
  })
})

// displays an individual cat
router.get('/:id', (req, res) => {
  const fileName = 'catData.json'
  utils.getData(fileName, (err, parseCats) => {
    if (err) {
      res.status(500).send('Sorry we could not find what you were looking for')
      return
    }
    const id = req.params.id
    const catObject = parseCats.cats.find(element => element.id === Number(id))
    const catLocation = catObject.location

    const birdFileName = 'homepageBirds.json'
    utils.getData(birdFileName, (err, parsedBirds) => {
      if (err) {
        res.status(500).send('Sorry we could not find what you were looking for')
        return
      }

      const birdsAtLocation = parsedBirds.birds.filter(bird => {
        return bird.sightings.some(sighting => {
          return sighting.location === catLocation
        })
      })

      const viewData = {
        cats: catObject,
        
        birds: birdsAtLocation
      }
      
      res.render('cat-details', viewData)
    })
  })
})

// edit route
router.get('/:id/edit', (req, res) => {
  const catFileName = 'catData.json'
  utils.getData(catFileName, (err, parseCats) => {
    if (err) {
      res.status(500).send('Sorry we could not find what you were looking for')
      return
    }
    const id = req.params.id
    const catObject = parseCats.cats.find(element => element.id === Number(id))
    const catLocation = catObject.location
    
    const viewData = {
      cats: catObject,
    }

    res.render('catEdit', viewData)
  })
})

// post route for edit
router.post('/:id/edit', (req, res) => {
  const newAnimal = req.body
  const id = Number(req.params.id)
  newAnimal.id = id

  // read in json file and locate cat
  const fileName = 'catData.json'
  utils.getData(fileName, (err, data) => {
    if (err) {
      res.status(500).send('Sorry we could not find what you were looking for')
      return
    }
    const newArr = [...data.cats.filter(cat => cat.id !== id), newAnimal]
    const newData = { cats: newArr }

    utils.editData('catData.json', newData, (err) => {
      if (err) {
        res.status(500).send('cat mods were not saved to file :(')
        return
      }
      res.redirect(`/cats/${id}`)
    })
  })
})