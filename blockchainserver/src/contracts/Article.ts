import {
    assert,
    ByteString,
    method,
    prop,
    hash256,
    Utils,
    PubKey,
    Sig,
    hash160,
} from 'scrypt-ts'

import { OrdinalNFT } from 'scrypt-ord'

export class Article extends OrdinalNFT {
    @prop()
    articalAuthor: ByteString

    @prop()
    shareReward: bigint

    @prop()
    likeFee: bigint

    @prop()
    publishdate: ByteString

    @prop()
    category: ByteString

    @prop()
    heading: ByteString

    @prop()
    subheading: ByteString

    @prop()
    content: ByteString

    @prop(true)
    likecount: bigint

    @prop(true)
    sharecount: bigint

    @prop(true)
    authorPubKey: PubKey

    constructor(
        shareReward: bigint,
        likeReward: bigint,
        articalAuthor: ByteString,
        content: ByteString,
        subheading: ByteString,
        heading: ByteString,
        publishdate: ByteString,
        category: ByteString,
        authorPubKey: PubKey,
        likecount: bigint,
        sharecount: bigint
    ) {
        super()
        this.init(...arguments)
        this.shareReward = shareReward
        this.likeFee = likeReward
        this.publishdate = publishdate
        this.heading = heading
        this.subheading = subheading
        this.category = category
        this.articalAuthor = articalAuthor
        this.authorPubKey = authorPubKey

        this.content = content
        this.likecount = likecount
        this.sharecount = sharecount
    }

    @method()
    public like(
        likerSig: Sig,
        publicKeyLiker: PubKey,
        rewardamount: bigint,
        authorPubKey: PubKey
    ) {
        console.log('rewardamount', rewardamount)
        console.log('like fee', this.likeFee)
        assert(rewardamount >= this.likeFee, 'like reward is less than asked')
        assert(
            authorPubKey === this.authorPubKey,
            'author pubkey is not correct'
        )

        assert(
            this.checkSig(likerSig, publicKeyLiker),
            "User's signature check failed"
        )
        this.likecount = this.likecount + BigInt(1)
        console.log('this.likecount', this.likecount)

        let outputs = this.buildStateOutputNFT()
        outputs += Utils.buildPublicKeyHashOutput(
            hash160(this.authorPubKey),
            rewardamount
        )
        outputs += this.buildChangeOutput()

        this.debug.diffOutputs(outputs)
        assert(
            this.ctx.hashOutputs === hash256(outputs),
            'hashOutputs check failed'
        )
    }

    @method()
    public share(sharerpubKey: PubKey, sharerSig: Sig) {
        assert(
            this.checkSig(sharerSig, sharerpubKey),
            "User's signature check failed"
        )

        this.sharecount++

        assert(
            this.ctx.hashOutputs ==
                hash256(this.buildStateOutput(this.ctx.utxo.value)),
            'hashOutputs check failed'
        )
    }
    // @method()
    //     public readmore(sharerpubKey: PubKey, sharerSig: Sig) {
    // //         assert(
    // //             this.checkSig(sharerSig, sharerpubKey),
    // //             "User's signature check failed"
    // //         )
    // //         let outputs = toByteString('')
    // //         outputs = Utils.buildPublicKeyHashOutput(
    // //             hash160(this.authorPubKey),
    // //             this.shareReward
    // //         )
    // //   this.sharecount++
    // //         this.debug.diffOutputs(outputs)
    //         assert(
    //             true,
    //             'hashOutputs check failed'
    //         )
    //     }
}
