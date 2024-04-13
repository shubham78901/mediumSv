import fs from 'fs'
import mime from 'mime'
import { DefaultProvider, bsv, PubKey, toHex, toByteString } from 'scrypt-ts'
import { Article } from '../src/contracts/Article'
import { NeucronSigner } from 'neucron-signer'

export interface MintedData {
    deploytxid: string
    currenttxid: string
    authorpubkey: string
    filehex: string
}

export async function Mint(
    authtoken: string,
    sharereward: number,
    likefee: number,
    publishdate: string,
    heading: string,
    subheading: string,
    category: string,
    articalauthor: string,
    content: string,
    filename: string
): Promise<MintedData> {
    const fileData: Buffer = await fs.promises.readFile(`./uploads/${filename}`)

    await Article.loadArtifact('./artifacts/Article.json')

  
    const nec_signer = await new NeucronSigner(
        new DefaultProvider({
            network: bsv.Networks.mainnet,
        }),
        authtoken
    )
    const authorPubKey = await nec_signer.getDefaultPubKey()

    const instance = new Article(
        BigInt(sharereward),
        BigInt(likefee),
        toByteString(articalauthor, true),
        toByteString(content, true),
        toByteString(publishdate, true),
        toByteString(heading, true),
        toByteString(subheading, true),
        toByteString(category, true),
        PubKey(toHex(authorPubKey)),
        0n,
        0n
    )

    await instance.connect(nec_signer)

    const mimeType: string = mime.lookup(filename) || 'application/octet-stream'
    console.log(`File Type: ${mimeType}`)

    const inscriptiontx = await instance.inscribeImage(fileData, mimeType)
    const getinscription = instance.getInscription()
    let filehex = ''
    if (getinscription) {
        filehex = toHex(getinscription?.content)
    }

    const authorPubKeystr = instance.authorPubKey
    return {
        deploytxid: inscriptiontx.id,
        currenttxid: inscriptiontx.id,
        authorpubkey: authorPubKeystr,
        filehex: filehex,
    }
}
