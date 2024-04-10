import {
    DefaultProvider,
    MethodCallOptions,
    PubKey,
    bsv,
    buildPublicKeyHashScript,
    findSig,
    hash160,
    toHex,
} from 'scrypt-ts'
import { Article } from '../src/contracts/Article'
import { NeucronSigner } from 'neucron-signer'

export async function like(
    txid: string,
    outputindex: number
    // authtoken: string
): Promise<string> {
    await Article.loadArtifact('./artifacts/Article.json')
    const provider = new DefaultProvider({
        network: bsv.Networks.mainnet,
    })
    await provider.connect()
    const nec_signer = await new NeucronSigner(
        new DefaultProvider({
            network: bsv.Networks.mainnet,
        })
    )
    await nec_signer.login('ss363757@gmail.com', 'Shubham123')
    await nec_signer.connect(provider)
    let tx: bsv.Transaction = await provider.getTransaction(txid)

    const meInstance = Article.fromUTXO({
        txId: tx.id,
        outputIndex: outputindex,
        script: tx.outputs[outputindex].script.toHex(),
        satoshis: tx.outputs[outputindex].satoshis,
    })

    const rewardamount = meInstance.likeFee
    await meInstance.connect(nec_signer)
    const transactionResponse = await meInstance.provider?.getTransaction(txid)

    if (transactionResponse) {
        // If transactionResponse is not undefined, assign its value to tx
        tx = transactionResponse
    } else {
        // Handle the case when transactionResponse is undefined
        console.error('Transaction not found for txid:', txid)
        // You may choose to return an error response or handle it in another way
    }

    let latestInstance: Article | undefined
    try {
        latestInstance = meInstance
    } catch (error) {
        console.error('Error fetching latest instance:', error)
        return '' // Return early or handle the error as needed
    }

    if (!latestInstance) {
        console.error('Latest instance is undefined')
        return '' // Return early or handle the absence of latestInstance
    }

    // await latestInstance.connect(provider)

    const meLikeInstance = latestInstance.next()
    meLikeInstance.likecount = meLikeInstance.likecount + BigInt(1)
    const sc = meLikeInstance.lockingScript
    const myAddress = await nec_signer.getDefaultAddress()
    latestInstance.bindTxBuilder('like', async function () {
        const unsignedTx: bsv.Transaction = new bsv.Transaction().addInput(
            meInstance.buildContractInput()
        )

        unsignedTx
            .addOutput(
                new bsv.Transaction.Output({
                    script: sc,
                    satoshis: 1,
                })
            )

            .addOutput(
                new bsv.Transaction.Output({
                    script: buildPublicKeyHashScript(
                        hash160(myPublicKey.toString())
                    ),
                    satoshis: Number(rewardamount),
                })
            )

            .change(myAddress)
        return Promise.resolve({
            tx: unsignedTx,
            atInputIndex: 0,
            nexts: [],
        })
    })

    const myPublicKey = await nec_signer.getDefaultPubKey()

    try {
        const authorPubKey = latestInstance.authorPubKey

        const { tx: likeTx } = await latestInstance.methods.like(
            (sigResps) => findSig(sigResps, myPublicKey),
            PubKey(toHex(myPublicKey)),
            rewardamount,
            authorPubKey,
            {
                // sign with the private key corresponding to `myPublicKey` (which is `myPrivateKey` in the signer)
                // since I am the issuer at the beginning
                pubKeyOrAddrToSign: myPublicKey,

                transfer: meLikeInstance,
            } as MethodCallOptions<Article>
        )
        console.log('Recallable of asset token called: ' + likeTx.id)

        return likeTx.id
    } catch (error) {
        console.error('Error while liking:', error)
        return '' // Return early or handle the error as needed
    }
}
