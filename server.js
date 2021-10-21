// handlebars requiring
const express = require('express')
const hbs = require('express-handlebars')

// fs.read function
const { getData } = require('./utils')

// router requiring
const puppiesRoutes = require('./puppiesRoutes')

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

module.exports = server

// Simple GET '/' route
server.get('/', (req, res) => {
  // read the puppies data!'
  const fileName = 'data.json'
  getData(fileName, (err, parsedData) => {
    if (err) {
      res.status(500).send('Sorry, we could not find what you were looking for :(')
      return
    }
    // console.log('working puppy image route: ', parsedData.puppies[0].image)
    const viewData = {
      puppies: parsedData.puppies
    }
    res.render('home', viewData)
  })
})
