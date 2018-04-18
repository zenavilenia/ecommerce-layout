const multer = require('multer')
const Storage = require('@google-cloud/storage')


function getPublicUrl(filename) {
  return `https://storage.googleapis.com/${BUCKET_CONFIG.name}/${filename}`;
}

const BUCKET_CONFIG = {
  name: 'upload-e-commerce.zenavilenia.ga'
}

module.exports = {
  upload(req, res, next) {
    if (!req.file) return next('upload gagal')

    const storage = Storage({
      projectId: 'extreme-pixel-201107',
      keyFilename: 'bucket-ecommerce.json'
    })
    const bucket = storage.bucket(BUCKET_CONFIG.name)
    const filename = Date.now() + '.' + req.file.originalname.split('.').pop()
    const file = bucket.file(filename)
    const stream = file.createWriteStream({
      metadata: {
        contentType: req.file.mimetype
      }
    })

    stream.on('error', (err) => {
      console.log('error uploading to GCS', err)
      next(err)
    })

    stream.on('finish', () => {
      file.makePublic()
        .then(() => {
          req.imageURL = getPublicUrl(filename)
          next()
        })
    })
    stream.end(req.file.buffer)
  }
}