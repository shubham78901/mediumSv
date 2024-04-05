import axios from 'axios';
import FormData from 'form-data';
import Post from '../model/post.js'; // Import the Post model
import multer from 'multer';

import fs from 'fs';
import path from 'path'; 

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }

    return result;
}





// Create multer instance

export const createPost = async (req, res) => {
    console.log("req.body",req.body)
    console.log("req.file",req.file)
    console.log("req.userId",req.user_id)
    try {
        console.log("create post called")
      const  {
            
            category,
            subheading,
            heading,
            articalauthor,
            publishdate ,
            // likefee,
            // sharereward,
            content
          } = req.body;
        console.log("req.body after const",req.body)

        // console.log(req)

        // Log the received data for debugging
        // console.log(authtoken,
        //     sharereward,
        //     likefee,
        //     publishdate,
        //     heading,
        //     subheading,
        //     category,
        //     articalauthor,
        //     content);

        // Check if file was uploaded
        if (!req.file) {
            console.error('No file uploaded');
            return res.status(400).json({ success: false, error: 'No file uploaded' });
        }

        // Create FormData object for multipart/form-data
        console.log("req.body after filecheck",req.body)
        const filePath = path.join( "uploads", req.file.filename);
        const fileBuffer = fs.readFileSync(filePath);

        // // Create FormData object for multipart/form-data
        // const formData = new FormData();
        // formData.append("file", fileBuffer, req.file.originalname);// Add uploaded file
        // // formData.append('authtoken', authtoken);
        // formData.append('sharereward', sharereward);
        // formData.append('likefee', likefee);
        // formData.append('publishdate', publishdate);
        // formData.append('heading', heading);
        // formData.append('subheading', subheading);
        // formData.append('category', category);
        // formData.append('articalauthor', articalauthor);
        // formData.append('content', content);
        // console.log("req.body after filling formdaat",req.body)
        // // Make the POST request to mint the token
        // const mintResponse = await axios.post('http://localhost:5000/custom/mint', formData, {
        //     headers: {
        //         ...formData.getHeaders(),
        //     }
        // });

        // console.log('Minting response:', mintResponse.data);

        // Handle the response
        // if (mintResponse.data.success) {
            // Save the post to MongoDB
            const newPost = new Post({
                heading,
                subHeading: subheading,
                description: content,
                picture: '',
                username: articalauthor,
                categories: category,
                publishDate: publishdate,
                // likeCount: 0,
                // shareCount: 0,
                // deployTxid: mintResponse.data.mintResult.deploytxid,
                // currentTxid: mintResponse.data.mintResult.currenttxid,
                fileHex: "",
                // authorPubkey: mintResponse.data.mintResult.authorpubkey,
                // shareReward: sharereward,
                // likeReward: likefee,
                title:generateRandomString(12),                content
            });

            await newPost.save(); // Save the post to MongoDB

            res.status(200).json({ message: 'Post saved successfully', post: newPost });
        // } else {
        //     res.status(500).json({ error: 'Error minting token', details: mintResponse.data.error });
        // }
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
};



export const updatePost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);

        if (!post) {
            response.status(404).json({ msg: 'Post not found' })
        }
        
        await Post.findByIdAndUpdate( request.params.id, { $set: request.body })

        response.status(200).json('post updated successfully');
    } catch (error) {
        response.status(500).json(error);
    }
}

export const deletePost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);
        
        await post.delete()

        response.status(200).json('post deleted successfully');
    } catch (error) {
        response.status(500).json(error)
    }
}

export const getPost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);

        response.status(200).json(post);
    } catch (error) {
        response.status(500).json(error)
    }
}

export const getAllPosts = async (request, response) => {
   
    let category = request.query.category;
    let posts;
    try {
        if (category) 
            posts = await Post.find({ categories: category });
        else 
            posts = await Post.find({});
            
        response.status(200).json(posts);
    } catch (error) {
        response.status(500).json(error)
    }
}

export const getImage = async (request, response) => {
    console.log(request.params)
    try {
      
      console.log(request.params.id)
        const postId = await Post.findById(request.params.id);

        // Check if postId is provided
        if (!postId) {
            return response.status(400).json({ error: 'postId is required' });
        }

        // Find the post by its ID
        const post = await Post.findById(request.params.id);
      

        // Check if the post exists
    
        // Retrieve deployTxid and outputIndex from the post
        const { deployTxid} = post;
     console.log("deployTxid",deployTxid)
        // Make an HTTP POST request to the '/data' route
        const dataResponse = await axios.post('http://localhost:5000/custom/data', {
            txid: deployTxid,
            outputindex: 0
        });

        // Extract data from the response
        const convertedData = dataResponse.data.data;

        // Example response
        
        response.status(200).json(convertedData);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
};