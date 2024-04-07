import express, { Request, Response } from 'express'

import { Sendfile } from '../service/sendfile'

const router = express.Router()

router.post('/sendfile', async function (req: Request, res: Response) {
    console.log('Retrieving image from UTXO outpoint..')

    const { txid, outputindex } = req.body

    try {
        console.log(
            'Received minting request with TokenSupply:',
            txid,
            outputindex
        )

        console.log('Loan token minting request')

        // Call the Sendfile function
        const result = await Sendfile(txid, outputindex)

        // Assuming 'Sendfile' returns an object containing 'transactionId'

        // console.log(`Publish successful. Token ID: ${result}`);

        res.json({ success: true, result })
    } catch (error) {
        console.error('Error publishing article:', error)
        res.status(500).json({ success: false, error: 'Internal Server Error' })
    }
})

export default router
