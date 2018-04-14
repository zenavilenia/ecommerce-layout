const router = require('express').Router()
const {findAll, findByCategory, addItem, update, remove} = require('../controllers/item.controller')

router
    .get('/', findAll)
    .get('/by_category/:categoryId', findByCategory)
    .post('/', addItem)
    .put('/', update)
    .delete('/', remove)

module.exports = router