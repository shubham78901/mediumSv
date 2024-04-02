import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true,
        unique: true
    },
    wallet_id: {
        type: String,
        required: true,
        unique: true
    },
    wallet_address: {
        type: String,
        required: true,
        unique: true
    },
    pub_key: {
        type: String,
        required: true,
        unique: true
    },
    paymail_id: {
        type: String,
        required: true,
        unique: true
    }
});

const user = mongoose.model('user', userSchema);

export default user;
