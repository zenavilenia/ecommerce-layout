const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose');

//mongoose.connect('mongodb://localhost/e-commerce_db');
mongoose.connect(`mongodb://admin21:admin21@ds241699.mlab.com:41699/e-commerce_mlab-db`);
require('dotenv').config()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('connected to mongoose')
});

const index = require('./routes/index')
app.use('/', index)

const category = require('./routes/category')
app.use('/category', category)

const item = require('./routes/item')
app.use('/item', item)

const ongkir = require('./routes/ongkir')
app.use('/ongkir', ongkir)

const transaction = require('./routes/transaction')
app.use('/transaction', transaction)

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server starts on ${port}`)
})
