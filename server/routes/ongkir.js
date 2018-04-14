const router = require('express').Router()
const {findAllProvince, findAllCity, getOngkir} = require('../controllers/ongkir.controller')

router
    .get('/province', findAllProvince)
    .get('/city/:province_id', findAllCity)
    .post('/price', getOngkir)

module.exports = router