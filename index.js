const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const bodyparser = require('body-parser')
require('dotenv').config()
const mainRouter = require('./src/routes/index')
const app = express()
const port = process.env.PORT || 3000 // menggunakan port default 3000 jika PORT tidak ada di file .env

app.use(bodyparser.urlencoded({ extended: true }))
app.use(cors())
app.use(morgan('dev'))
app.use(bodyparser.json())
app.use('/', mainRouter)

// Middleware untuk menangani kesalahan jika rute tidak cocok
app.all('*', (req, res, next) => {
 res.status(404).json({
  status: 'Error',
  statusCode: 404,
  message: 'This is root, check again the endpoint API',
 })
})

// Middleware untuk menangani permintaan yang sesuai dengan route tetapi tidak ada handler
app.use((req, res, next) => {
 res.status(200).json({ status: 'Success', statusCode: 200 })
})

// Middleware untuk menangani kesalahan internal server
app.use((err, req, res, next) => {
 console.error(err.stack)
 res.status(500).json({
  status: 'Error',
  statusCode: 500,
  message: 'Internal Server Error',
 })
})

app.listen(port, () => {
 console.log(`Server running on port ${port}`)
})
