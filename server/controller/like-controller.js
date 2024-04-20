
import Comment from '../model/comment.js';
import mongoose from 'mongoose';

import Post from '../model/post.js';
import axios from 'axios';

export const likePost = async (request, response) => {
    try {
        // Find the post by ID
  const postId = request.params.id.trim();

        
        // Check if postId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return response.status(400).json({ error: 'Invalid post ID' });
        }
        
        const post = await Post.findById(postId);
        
        // Check if the post exists
        if (!post) {
            return response.status(404).json({ error: 'Post not found' });
        }
        
        const authToken = request.auth_token;
        console.log(authToken);

        // Make a POST request to the like API endpoint
        const likeResponse = await axios.post('http://localhost:5000/custom/like', {
            txid: post.currentTxid,
            outputindex: 0,
            authToken: authToken
        });

        // Check if the like API call was successful
        if (likeResponse.data.success) {
            // Update the post likeCount and currentTxid
            post.likeCount += 1;
            post.currentTxid = likeResponse.data.result;
            console.log(" likeResponse.data.result", likeResponse.data.result)
            await post.save(); // Save the updated post
            response.status(200).json({ message: 'Post liked successfully', updatedpost: post });
        } else {
            // Handle case where like API call was not successful
            response.status(500).json({ error: 'Error liking post', details: likeResponse.data.error });
        }
    } catch (error) {
        // Handle any errors
        console.error('Error liking post:', error);
        response.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
};


export const getComments = async (request, response) => {
    try {
        const comments = await Comment.find({ postId: request.params.id });
        
        response.status(200).json(comments);
    } catch (error) {
        response.status(500).json(error)
    }
}

export const deleteComment = async (request, response) => {
    try {
        const comment = await Comment.findById(request.params.id);
        await comment.delete()

        response.status(200).json('comment deleted successfully');
    } catch (error) {
        response.status(500).json(error)
    }
}