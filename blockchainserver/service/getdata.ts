import { DefaultProvider, bsv } from 'scrypt-ts'
import { Article } from '../src/contracts/Article'
import { NeucronSigner } from 'neucron-signer'

export interface Outpoint {
    txId: string
    outputIndex: number
}

export interface ConvertedData {
    likecount: string
    sharecount: string
    articleauthor: string
    content: string
    publishdate: string
    heading: string
    subheading: string
    authorPubKey: string
    category: string
    filehex: string
}

export async function GetData(
    txid: string,
    outputindex: number
): Promise<ConvertedData> {
    await Article.loadArtifact('./artifacts/Article.json')
    const provider = new DefaultProvider({
        network: bsv.Networks.mainnet,
    })

    await provider.connect()

    const tx = await provider.getTransaction(txid)

    const meInstance = Article.fromUTXO({
        txId: txid,
        outputIndex: outputindex,
        script: tx.outputs[outputindex].script.toHex(),
        satoshis: 1,
    })
    const nec_signer = await new NeucronSigner(
        new DefaultProvider({
            network: bsv.Networks.mainnet,
        })
    )
    await nec_signer.login('ss363757@gmail.com', 'Shubham123')
    await nec_signer.connect(provider)

    await meInstance.connect(nec_signer)
    const latestInstance = meInstance
    const likecount = latestInstance.likecount.toString()
    const sharecount = latestInstance.sharecount.toString()
    console.log('likecount:', likecount)
    console.log('sharecount', sharecount)

    const promises = [
        convertHexToString(latestInstance.articalAuthor),
        convertHexToString(latestInstance.content),
        convertHexToString(latestInstance.publishdate),
        convertHexToString(latestInstance.heading),
        convertHexToString(latestInstance.subheading),
        latestInstance.authorPubKey,
        convertHexToString(latestInstance.category),
    ]
    const [
        articleauthor,
        content,
        publishdate,
        heading,
        subheading,
        authorPubKey,
        category,
    ] = await Promise.all(promises)

    return {
        likecount,
        sharecount,
        articleauthor,
        content,
        publishdate,
        heading,
        subheading,
        authorPubKey,
        category,
        filehex: '',
        // Add the 'file' property here
    }

    throw new Error('Latest instance not found.')
}

async function convertHexToString(
    hexValue: string | undefined
): Promise<string> {
    return hexValue ? Buffer.from(hexValue, 'hex').toString('utf-8') : ''
}
