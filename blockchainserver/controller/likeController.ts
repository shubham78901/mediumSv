import express, { Request, Response } from 'express'
import { like } from '../service/like' // Import the like function from its module

const router = express.Router()

router.post('/like', async function (req: Request, res: Response) {
    console.log('Handling like request...')

    const { txid, outputindex,authToken } = req.body

    try {
        console.log('Received request for data:', txid, outputindex)

        console.log('Data request')

        // Call the like function
        const result = await like(txid, outputindex,authToken)

        console.log(`Like successful. Transaction ID: ${result}`)

        res.json({ success: true, result })
    } catch (error) {
        console.error('Error liking article:', error)
        res.status(500).json({ success: false, error: 'Internal Server Error' })
    }
})

export default router
