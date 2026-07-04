require('dotenv').config({ override: true })

const path = require('path')
const express = require('express')
const authRoutes = require('./routes/auth')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.static(path.join(__dirname, '..', 'frontend')))

app.use('/api/auth', authRoutes)

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})
