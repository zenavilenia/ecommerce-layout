const router = require('express').Router()
const {checkout} = require('../controllers/transaction.controller')
const {auth} = require('../middleware/auth')

router
    .post('/', auth, checkout)

module.exports = router