import axios from 'axios';
import FormData from 'form-data';
import Post from '../model/post.js'; // Import the Post model
import multer from 'multer';
import mongoose from 'mongoose';
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
    try {
        console.log("req.body", req.body);
        console.log("req.file", req.file);
        console.log("req.userId", req.user_id);
        console.log("auth token is", req.auth_token);
  const auth_token=req.auth_token
        const {
            category,
            subheading,
            heading,
            articalauthor,
            publishdate,
            likefee,
            sharereward,
            content
        } = req.body;

        console.log("Received data:", {
            category,
            subheading,
            heading,
            articalauthor,
            publishdate,
            likefee,
            sharereward,
            content
        });

        if (!req.file) {
            console.error('No file uploaded');
            return res.status(400).json({ success: false, error: 'No file uploaded' });
        }

        const filePath = path.join("uploads", req.file.filename);
        const fileBuffer = fs.readFileSync(filePath);

        const formData = new FormData();
        formData.append("file", fileBuffer, req.file.originalname);
        formData.append('sharereward', sharereward);
        formData.append('likefee', likefee);
        formData.append('publishdate', publishdate);
        formData.append('heading', heading);
        formData.append('subheading', subheading);
        formData.append('category', category);
        formData.append('articalauthor', articalauthor);
        formData.append('content', content);
        formData.append('authtoken', auth_token);

        const mintResponse = await axios.post('http://localhost:5000/custom/mint', formData, {
            headers: {
                ...formData.getHeaders(),
            }
        });

        console.log('Minting response:', mintResponse.data);

        if (mintResponse.data.success) {
            const newPost = new Post({
                heading,
                subHeading: subheading,
                description: content,
                picture: '',
                username: articalauthor,
                categories: category,
                publishDate: publishdate,
                likeCount: 0,
                shareCount: 0,
                deployTxid: mintResponse.data.mintResult.deploytxid,
                currentTxid: mintResponse.data.mintResult.currenttxid,
                fileHex: "",
                authorPubkey: mintResponse.data.mintResult.authorpubkey,
                shareReward: sharereward,
                likeReward: likefee,
                title: generateRandomString(12),
                content
            });

            await newPost.save();

            res.status(200).json({ message: 'Post saved successfully', post: newPost });
        } else {
            res.status(500).json({ error: 'Error minting token', details: mintResponse.data.error });
        }
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
    try {
        // Retrieve the post ID from the request parameters
        const postId = request.params.id;

        // Check if postId is provided
        if (!postId) {
            return response.status(400).json({ error: 'postId is required' });
        }

        // Attempt to convert the postId to a valid ObjectId
        const isValidObjectId = mongoose.Types.ObjectId.isValid(postId);

        // If the postId is not a valid ObjectId, return an error
        if (!isValidObjectId) {
            return response.status(400).json({ error: 'Invalid postId' });
        }

        // Find the post by its ID
        const post = await Post.findById(postId);

        // Check if the post exists
        if (!post) {
            return response.status(404).json({ error: 'Post not found' });
        }

        // Retrieve deployTxid from the post
        const { deployTxid } = post;

        // Make an HTTP POST request to the '/data' route
        const dataResponse = await axios.post('http://localhost:5000/custom/sendfile', {
            txid: deployTxid,
            outputindex: 0
        });

        // Extract data from the response
        const imageData = dataResponse.data;

        // Return the image data
        response.status(200).json(imageData);
    } catch (error) {
        // Handle any errors
        console.error('Error fetching image:', error);
        response.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
};
