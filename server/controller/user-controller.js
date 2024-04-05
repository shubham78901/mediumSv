import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import axios from 'axios';
import Token from '../model/token.js'
import User from '../model/user.js';

dotenv.config();

export const singupUser = async (request, response) => {
    try {
      const { username, email, password } = request.body;
      const user = { username, email, password };
  
      // Validate input data
      if (!username || !email || !password) {
        return response.status(400).json({ msg: 'Please provide username, email, and password' });
      }
  
      const axiosResponse = await axios.post(
        'https://dev.neucron.io/v1/auth/signup',
        { email: email, password: user.password },
        { headers: { 'Content-Type': 'application/json' } }
      );
  
      console.log('signup');
  
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
        const savedUser = await newUser.save();
  
        // Extract user data from the response
        return response.status(200).json({ msg: 'Signup successful', data: userData });
      } else if (axiosResponse.status === 409) {
        // User already exists
        const errorMessage = axiosResponse.data.message;
        return response.status(409).json({ msg: errorMessage });
      } else if (axiosResponse.status === 401) {
        // Handle invalid credentials
        const errorMessage = axiosResponse.data.message;
        const errorDetail = axiosResponse.data.detail;
        return response.status(401).json({ msg: errorMessage, detail: errorDetail });
      } else {
        // Handle other status codes
        return response.status(axiosResponse.status).json({ msg: 'Error while signing up user' });
      }
    } catch (error) {
      console.error(error);
  
      // Handle axios errors
      if (error.response) {
        // The request was made and the server responded with a status code
        return response.status(error.response.status).json({ msg: error.response.data.message });
      } else if (error.request) {
        // The request was made but no response was received
        return response.status(500).json({ msg: 'No response received from the server' });
      } else {
        // Something happened in setting up the request that triggered an Error
        return response.status(500).json({ msg: error.message });
      }
    }
  };

  export const loginUser = async (request, response) => {
    try {
      const { email, password } = request.body;
  
      // Validate input data
      if (!email || !password) {
        return response.status(400).json({ msg: 'Please provide email and password' });
      }
  
      const axiosResponse = await axios.post(
        'https://dev.neucron.io/v1/auth/login',
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );
  
      if (axiosResponse.status === 200) {
        // Handle successful login
        const userData = axiosResponse.data.data;
        return response.status(200).json({ msg: 'Login successful', data: userData });
      } else if (axiosResponse.status === 401) {
        // Handle invalid credentials
        const errorMessage = axiosResponse.data.message;
        const errorDetail = axiosResponse.data.detail;
        return response.status(401).json({ msg: errorMessage, detail: errorDetail });
      } else {
        // Handle other status codes
        return response.status(axiosResponse.status).json({ msg: 'Error while logging in' });
      }
    } catch (error) {
      console.error(error);
  
      // Handle axios errors
      if (error.response) {
        // The request was made and the server responded with a status code
        return response.status(error.response.status).json({ msg: error.response.data.message });
      } else if (error.request) {
        // The request was made but no response was received
        return response.status(500).json({ msg: 'No response received from the server' });
      } else {
        // Something happened in setting up the request that triggered an Error
        return response.status(500).json({ msg: error.message });
      }
    }
  };
 
export const logoutUser = async (request, response) => {
    const token = request.body.token;
    await Token.deleteOne({ token: token });

    response.status(204).json({ msg: 'logout successfull' });
};