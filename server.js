import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'

import additionalRoutes from './routes/additionalRoutes.js'
import NabhiRoutes from './routes/AuthRoutes.js'
import connectDB from './config/db.js'
import exclusiveRoutes from './routes/ExclusiveProductRoutes.js'
import fileUpload from 'express-fileupload'    

dotenv.config()

const app = express()

connectDB()

app.use(cors({ origin: '*' }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(fileUpload({                                  // ← add this
  useTempFiles: true,
  tempFileDir: '/tmp/',
  limits: { fileSize: 10 * 1024 * 1024 },
}))

// API Routes
app.use('/api/ad', additionalRoutes)
app.use('/api/auth', NabhiRoutes)
app.use('/api/exclusiveproducts', exclusiveRoutes)

// FRONTEND SERVING

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const frontendPath = path.join(__dirname, 'client', 'dist')

app.use(express.static(frontendPath))

// React Router handling
app.use((req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'))
})

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})