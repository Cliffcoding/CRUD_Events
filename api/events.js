const express = require('express');

const router = express.Router();

const queries = require('../db/queries');

function isValidId(req, res, next) {
  if(!isNaN(req.params.id)) return next();
  next(new Error('Invalid ID'))
}
function validEvent(events) {
  const hasName = typeof events.name == 'string' && events.name.trim() != '';
  const hasDate = typeof events.date == 'string' && events.name.trim() != '';
  return hasName && hasDate;
}

router.get('/', (req, res) => {
  queries.getAll().then(events => {
    res.json(events);
  })
})
router.get('/:id', isValidId, (req, res, next) => {
  queries.getOne(req.params.id).then(events => {
    if(events){
      res.json(events);
    } else {
      next(new Error('Not Found'))
    }
  })
})
router.post('/', (req, res, next) => {
  if (validEvent(req.body)) {
    queries.create(req.body).then(events => {
      res.json(events[0]);
    })
  } else {
    next(new Error('Invalid Event'))
  }
})
router.put('/:id', isValidId, (req, res, next) => {
  if (validEvent(req.body)) {
    queries.update(req.params.id, req.body).then(events => {
      res.json(events[0])
    })
  } else {
    next(new Error('Invalid Event'))
  }
})
router.delete('/:id', isValidId, (req, res) => {
  queries.delete(req.params.id).then(() => {
    res.json({
      deleted: true
    });
  });
});
module.exports = router;
