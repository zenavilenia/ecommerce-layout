const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Name required']
    },
    image: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        require: [true, 'Price required']
    },
    stock: {
        type: Number,
        require: [true, 'Stock required']
    },
    weight: {
        type: Number,
        require: [true, 'Weight required']
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'category'
    }
}, {
    timestamps: true
})

let item = mongoose.model('item', itemSchema)

module.exports = item