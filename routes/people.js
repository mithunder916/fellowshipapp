const express = require('express');
const router = express.Router();
const models = require('../models');
const Person = models.Person;

// REFACTOR: use router.params for id

router.get('/', (req, res, next) => {
  Person.findAll()
  .then(people => {
    res.json(people)
  })
  .catch(next)
})

router.get('/:id', (req, res, next) => {
  Person.findById(req.params.id)
  .then(person => {
    res.json(person)
  })
  .catch(next)
})

router.post('/', (req, res, next) => {
  Person.findOrCreate({
    where: {
      name: req.body.name,
      favoriteCity: req.body.favoriteCity
    }
  })
  .spread(person => {
    res.json(person)
  })
  .catch(next)
})

router.put('/:id', (req, res, next) => {
  Person.update(req.body, {
    where: {
      id: req.params.id
    },
    returning: true
  })
  .then(person => res.send(person))
  .catch(next)
})

router.delete('/:id', (req, res, next) => {
  Person.destroy({
    where: {
      id: req.params.id
    }
  })
  // different status code for deletion?
  .then(() => res.sendStatus(200))
  .catch(next)
})



module.exports = router;
