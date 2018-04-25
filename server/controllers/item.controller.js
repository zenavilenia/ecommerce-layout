const Item = require('../models/item.model');
const mongoose = require('mongoose');

module.exports = {
    findAll: (req, res) => {
        Item.find()
            .populate('categoryId')
            .then(result => {
                res.status(200).send({
                    message: 'query item success',
                    data: result
                })
            })
            .catch(err => {
                res.status(400).send({
                    message: err.message
                })
            })
    },
    findByCategory: (req, res) => {
        console.log("req", req)
        let categoryId = mongoose.Types.ObjectId(req.params.categoryId)
        Item.find({
            categoryId
        })
            .populate('categoryId')
            .then(result => {
                res.status(200).send({
                    message: 'query item per category success',
                    data: result
                })
            })
            .catch(err => {
                res.status(400).send({
                    message: err.message
                })
            })
    },
    addItem: (req, res) => {
      let item = new Item({
        name: req.body.name,
        image: req.imageURL || 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg',
        description: req.body.description || 'No description',
        price: req.body.price,
        stock: req.body.stock,
        weight: req.body.weight,
        categoryId: req.body.categoryId
      })
      
      item.save()
        .then(result => {
          res.status(201).send({
            message: 'add item success',
            data: result
          })
        })
        .catch(err => {
          res.status(400).send({
            message: err.message
          })
        })
    },
    update: (req, res) => {
      Item.update({
        _id: req.body.id
      }, {
        name: req.body.name,
        image: req.imageURL,
        description: req.body.description,
        price: req.body.price,
        stock: req.body.stock,
        weight: req.body.weight,
        categoryId: req.body.categoryId || "No Category"
      })
        .then(result => {
          res.status(200).send({
            message: 'update item success',
            data: result
          })
        })
        .catch(err => {
          res.status(400).send({
            message: err.message
          })
        })
    },
    updateNoImage: (req, res) => {
      Item.update({
        _id: req.body.id
      }, {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        stock: req.body.stock,
        weight: req.body.weight,
        categoryId: req.body.categoryId || "No Category"
      })
        .then(result => {
          res.status(200).send({
            message: 'update item success',
            data: result
          })
        })
        .catch(err => {
          res.status(400).send({
            message: err.message
          })
        })
    },
    remove: (req, res) => {
        Item.remove({
            _id: req.params.id
        })
            .then(result => {
                res.status(200).send({
                    message: 'remove item success',
                    data: result
                })
            })
            .catch(err => {
                res.status(400).send({
                    message: err.message
                })
            })
    }

};