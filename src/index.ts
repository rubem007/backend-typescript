import bodyParser from 'body-parser'
import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

import './database/connection'
import productController from './controllers/product.controller'

const PORT = process.env.PORT || 8080

const app = express()
app.use(bodyParser.json())

app.post('/api/products', productController.create)
app.get('/api/products', productController.findAll)
app.get('/api/products/:id', productController.findById)
app.put('/api/products/:id', productController.update)
app.delete('/api/products/:id', productController.delete)


app.listen(PORT, () => console.log(`server running in port ${PORT}`))
