import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import additionalRoutes from './routes/additionalRoutes.js'
import NabhiRoutes from './routes/AuthRoutes.js';
import connectDB from './config/db.js';

dotenv.config()

const app = express()

connectDB();

app.use(cors({ origin: '*' }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/ad', additionalRoutes);
app.use('/api/auth', NabhiRoutes);

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))