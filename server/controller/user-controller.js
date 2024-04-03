import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import axios from 'axios';
import Token from '../model/token.js'
import User from '../model/user.js';

dotenv.config();

export const singupUser = async (request, response) => {
    try {
        console.log(request.body);
        const { username, email, password } = request.body;
        const user = { username, email, password };

        console.log(email, user.password)
        const axiosResponse = await axios.post('https://dev.neucron.io/v1/auth/signup', JSON.stringify({
            email: email,
            password: user.password
        }), {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log(axiosResponse);

        if (axiosResponse.status === 200) {
            const userData = axiosResponse.data.data; 
            const newUser = new User({
                email,
                username,
                password,
                user_id: userData.user_id, 
                wallet_id: userData.wallet_id, 
                wallet_address: userData.wallet_address, 
                pub_key: userData.pub_key, 
                paymail_id: userData.paymail_id 
            });
    
            // Save the user to the database
            const savedUser = await newUser.save();// Extract user data from the response

            return response.status(200).json({ msg: 'Signup successful', data: userData });
        } else if (axiosResponse.status === 409) {
            // User already exists
            const errorMessage = axiosResponse.data.message;
            return response.status(409).json({ msg: errorMessage });
        } else {
            // Handle other status codes
            return response.status(axiosResponse.status).json({ msg: 'Error while signing up user' });
        }
    } catch (error) {
        console.error(error);
        return response.status(500).json({ msg: 'User alredy exist' });
    }
}






export const loginUser = async (email, password) => {
    try {
        const axiosResponse = await axios.post('https://dev.neucron.io/v1/auth/login', {
            email: email,
            password: password
        });

        // Return the Axios response directly
        return axiosResponse;
    } catch (error) {
        // Handle login error
        throw error;
    }
};

export const logoutUser = async (request, response) => {
    const token = request.body.token;
    await Token.deleteOne({ token: token });

    response.status(204).json({ msg: 'logout successfull' });
}