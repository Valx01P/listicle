import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import stockData from '../data/stockData.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).json(stockData)
})

router.get('/:ticker', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, '../../client/stock.html'))
})

export default router