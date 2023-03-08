import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

import './database/connection'
const PORT = process.env.PORT || 8080

const app = express()

app.listen(PORT, () => console.log(`server running in port ${PORT}`))
