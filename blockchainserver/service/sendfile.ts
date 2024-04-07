import { DefaultProvider, bsv, toHex } from 'scrypt-ts'

import { Article } from '../src/contracts/Article'

export async function Sendfile(
    txid: string,
    outputindex: number
): Promise<string> {
    const provider = new DefaultProvider({
        network: bsv.Networks.mainnet,
    })
    await Article.loadArtifact('./artifacts/Article.json')
    console.log('output index /sendfile', outputindex)
    await provider.connect()
    const tx = await provider.getTransaction(txid)

    const meInstance = Article.fromUTXO({
        txId: txid,
        outputIndex: 0,
        script: tx.outputs[0].script.toHex(),
        satoshis: 1,
    })

    const getinscription = meInstance.getInscription()
    if (getinscription) {
        console.log('getinscription contentType:', getinscription.contentType)
        return toHex(getinscription.content)
    } else {
        console.log('No inscription found')
        return ''
    }
}
