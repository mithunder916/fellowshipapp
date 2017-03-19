const Sequelize = require('sequelize');

const db = new Sequelize('postgres://localhost:5432/fellowshipapp', {
    logging: false
});

const Person = db.define('person', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  favoriteCity: {
    type: Sequelize.STRING,
    allowNull: false
  }
})


module.exports = {
  Person: Person,
  db
}
