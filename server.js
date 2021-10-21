// handlebars requiring
const express = require('express')
const hbs = require('express-handlebars')

// fs.read function
const { getData } = require('./utils')

// router requiring
const puppiesRoutes = require('./puppiesRoutes')
const catsRoutes = require('./catsRoutes')
const birdsRoutes = require('./birdsRoutes')

// defining server for index.js to use
const server = express()

// Server configuration
server.use(express.static('public'))
server.use(express.urlencoded({ extended: false }))

// Handlebars configuration
server.engine('hbs', hbs({ extname: 'hbs' }))
server.set('view engine', 'hbs')

// Your routes/router(s) should go here
server.use('/puppies', puppiesRoutes)
server.use('/cats', catsRoutes)
server.use('/birds', birdsRoutes)

module.exports = server

// Simple GET '/' route
server.get('/', (req, res) => {
  // read the puppies data!'
  const fileName = 'homepageBirds.json'
  getData(fileName, (err, parsedData) => {
    if (err) {
      res.status(500).send('Sorry, we could not find what you were looking for :(')
      return
    }
    const viewData = {
      // TODO: add desired viewData for home page
      birds: parsedData.birds
    }
    res.render('home', viewData)
  })
})

// Render about us page
server.get('/about-us', (req, res) => {
  const fileName = 'homepageBirds.json'
  getData(fileName, (err, parsedData) => {
    if (err) {
      res.status(500).send('Sorry, we could not find what you were looking for :(')
      return
    }
    const viewData = {
      // TODO: add desired viewData for home page
      birds: parsedData.birds
    }
    res.render('about-us', viewData)
  })
})

// Render about us page
server.get('/nz-pests', (req, res) => {
  const fileName = 'homepageBirds.json'
  getData(fileName, (err, parsedData) => {
    if (err) {
      res.status(500).send('Sorry, we could not find what you were looking for :(')
      return
    }
    const viewData = {
      // TODO: add desired viewData for home page
      birds: parsedData.birds
    }
    res.render('nz-pests', viewData)
  })
})
