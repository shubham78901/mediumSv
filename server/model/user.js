// Import necessary modules
import mongoose from 'mongoose';

// Define the user schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    wallet_id: {
        type: String,
        required: true
    },
    wallet_address: {
        type: String,
        required: true
    },
    pub_key: {
        type: String,
        required: true
    },
    paymail_id: {
        type: String,
        required: true
    }
});

// Create the User model
const User = mongoose.model('User', userSchema);

// Export the User model
export default User;
