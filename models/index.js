const Sequelize = require('sequelize');
const url = process.env.DATABASE_URL || `postgres://localhost:5432/fellowshipapp`

const db = new Sequelize(url, {
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
