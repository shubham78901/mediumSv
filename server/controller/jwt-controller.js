
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import Token from '../model/token.js';

dotenv.config();

export const authenticateToken = (request, response, next) => {
    const authHeader = request.headers['authorization'];
    request.auth_token=authHeader;

    const parts = authHeader.split('.');
    if (parts == null) {
        return response.status(401).json({ msg: 'token is missing' });
    }

const encodedPayload = parts[1];

// Decode the payload
const decodedPayload = atob(encodedPayload);

// Parse the decoded payload as JSON
const payload = JSON.parse(decodedPayload);

// Now you can access the properties of the payload
console.log(payload);
    
    
    
        if (!payload.user_id) {
            return response.status(403).json({ msg: 'invalid token' })
        }

        request.user_id = payload.user_id;
        next();
    
}

export const createNewToken = async (request, response) => {
    const refreshToken = request.body.token.split(' ')[1];

    if (!refreshToken) {
        return response.status(401).json({ msg: 'Refresh token is missing' })
    }

    const token = await Token.findOne({ token: refreshToken });

    if (!token) {
        return response.status(404).json({ msg: 'Refresh token is not valid'});
    }

    jwt.verify(token.token, process.env.REFRESH_SECRET_KEY, (error, user) => {
        if (error) {
            response.status(500).json({ msg: 'invalid refresh token'});
        }
        const accessToken = jwt.sign(user, process.env.ACCESS_SECRET_KEY, { expiresIn: '15m'});

        return response.status(200).json({ accessToken: accessToken })
    })


}