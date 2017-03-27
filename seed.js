const db = require('./models').db;

const seedPeople = () => db.Promise.map([
  {name: 'Mithun', favoriteCity: 'Tokyo'},
  {name: 'Eli', favoriteCity: 'Nara'},
  {name: 'Sean', favoriteCity: 'Brooklyn'}
], person => db.model('person').create(person))

db.sync({force: true})
  .then(seedPeople)
  .then(console.log('Seeded people OK'))
  .catch(error => console.error(error))
  .finally(() => db.close())
