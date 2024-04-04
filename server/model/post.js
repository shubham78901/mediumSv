import mongoose from 'mongoose';

const { Schema } = mongoose; // Destructure Schema from mongoose

const PostSchema = new Schema({
    heading: {
        type: String,
       
    },
    subHeading: {
        type: String,
    },
    description: {
        type: String,
    },
    picture: {
        type: String,
    },
    username: {
        type: String,
      
    },
    categories: {
        type: Array,
        required: false
    },
    publishDate: {
        type: String
    },
    likeCount: {
        type: Number // Change 'integer' to 'Number'
    },
    shareCount: {
        type: Number // Change 'Int' to 'Number'
    },
    deployTxid: {
        type: String
    },
    currentTxid: {
        type: String
    },
    fileHex: {
        type: String
    },
    authorPubkey: {
        type: String
    },
    shareReward: {
        type: Number // Change 'Int' to 'Number'
    },
    likeReward: {
        type: Number // Change 'Int' to 'Number'
    },
    content: {
        type: String
    },
});

const Post = mongoose.model('Post', PostSchema);

export default Post;
