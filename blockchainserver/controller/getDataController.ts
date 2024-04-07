import express, { Request, Response } from 'express';
import { GetData, ConvertedData } from '../service/getdata';

const router = express.Router();

router.post('/data', async function (req: Request, res: Response) {
  console.log('Received request for data:');

  const { txid, outputindex } = req.body;

  try {
    console.log('Received request for data:', txid, outputindex);
    console.log("Data request");

    // Call the GetData function
    const data: ConvertedData = await GetData(txid, outputindex);

    console.log("Data retrieval successful:", data);

    res.json({ success: true, data });

  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

export default router;
