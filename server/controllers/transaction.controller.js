const Transaction = require('../models/transaction.model');
const mongoose = require('mongoose');

module.exports = {
    checkout: (req, res) => {
        let user_id = req.headers.decoded.id
        let transaction = new Transaction({
            user: user_id,
            weight: req.body.weight,
            province_id: req.body.province_id,
            city_id: req.body.city_id,
            courier: req.body.courier,
            jenisPengiriman: req.body.jenisPengiriman,
            total: req.body.total,
            item: req.body.item
        })
      
        transaction.save()
            .then(result => {
                console.log('success')
                res.status(201).send({
                    message: 'add transaction success',
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