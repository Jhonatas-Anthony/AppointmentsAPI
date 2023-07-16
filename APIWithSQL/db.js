const sqlite3 = require('sqlite3')
const {open} = require('sqlite')

// you would have to import / invoke this in another file
async function openDb () {
  return open({
    filename: './dev.sqlite3',
    driver: sqlite3.Database
  })
}

module.exports = openDb