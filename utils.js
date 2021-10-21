const fs = require('fs')
const path = require('path')

module.exports = {
  getData,
  editData
}

function getData (callback) {
  const filename = path.join(__dirname, 'data.json')

  fs.readFile(filename, 'utf8', (err, contents) => {
    if (err) {
      console.error(err.message)
      callback(new Error('Unable to load the file'))
      return
    }
    try {
      const parsedData = JSON.parse(contents)
      callback(null, parsedData)
    } catch (parseError) {
      console.error(parseError)
      callback(new Error('Unable to parse the data file'))
    }
  })
}

function editData (file, data, callback) {
  const fileName = path.join(__dirname, file)
  fs.writeFile(fileName, JSON.stringify(data, null, 2), 'utf-8', (err, contents) => {
    if (err) {
      callback(new Error(err.message))
      return
    }
    callback(null)
  })
}
