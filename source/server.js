import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import stockRouter from './routes/stocks.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

// Serve static files from the client folder
app.use(express.static(path.resolve(__dirname, '../public')))

// Use the stock router
app.use('/stocks', stockRouter)

// Serve the home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

// Handle 404 errors
app.get('*', (req, res) => {
    res.status(404).sendFile(path.resolve(__dirname, '../public/404.html'));
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})