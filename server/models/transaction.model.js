const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transactionSchema = mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    weight: {
        type: Number,
        require: [true, 'Weight required']
    },
    province_id: {
        type: Number,
        require: [true, 'Province required']
    },
    city_id: {
        type: Number,
        require: [true, 'City required']
    },
    courier: {
        type: String,
        require: [true, 'Courier required']
    },
    jenisPengiriman: Schema.Types.Mixed,
    total: {
        type: Number,
        require: [true, 'Total required']
    },
    item: [{
        type: Schema.Types.ObjectId,
        ref: 'item'
    }],
}, {
    timestamps: true
})

let transaction = mongoose.model('transaction', transactionSchema)

module.exports = transaction