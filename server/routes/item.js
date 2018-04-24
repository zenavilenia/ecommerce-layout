const router = require('express').Router()
const multer = require('multer')
const uploadMidleware = require('../middleware/upload')
const {findAll, findByCategory, addItem, update, remove} = require('../controllers/item.controller')
const {auth, authAdmin} = require('../middleware/auth')

const uploaderMem = multer({
  storage: multer.memoryStorage(),
  limits: {
      fileSize: 10 * 1024 * 1024
  }
})

router
    .get('/', findAll)
    .get('/by_category/:categoryId', findByCategory)
    .post('/', authAdmin, uploaderMem.single('image'),uploadMidleware.upload, addItem)
    .put('/', authAdmin, uploaderMem.single('image'),uploadMidleware.upload, update)
    .delete('/:id', authAdmin, remove)

module.exports = router