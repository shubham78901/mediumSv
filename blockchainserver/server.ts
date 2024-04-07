import express from 'express'

import mintController from './controller/mintController'
import sendFileController from './controller/sendFileController'
import getDataController from './controller/getDataController'
import likeController from './controller/likeController'
// import shareController from './controller/shareController'
const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json({ limit: '500mb' }))

app.use('/custom', mintController)
app.use('/custom', sendFileController)
app.use('/custom', getDataController)
app.use('/custom', likeController)

app.get('/health', (req, res) => {
    res.json({ status: 'OK' })
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
