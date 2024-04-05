
import Comment from '../model/comment.js';

import Post from '../model/post.js';
import axios from 'axios';

export const likePost = async (request, response) => {
    try {
        // Find the post by ID
        const postId = request.params.id;
        const post = await Post.findById(postId);

        // Check if the post exists
        if (!post) {
            return response.status(404).json({ error: 'Post not found' });
        }

        // Increase the likeCount by one
      

        // Update the post in MongoDB
        const likeResponse = await axios.post('http://localhost:5000/custom/like', {
            txid: post.currentTxid,
            outputindex: 0 // Assuming you have an outputIndex property in your Post model
        });

        console.log('Like API response:', likeResponse);
        if(likeResponse.data.success==true){
            post.likeCount += 1;
        }
    //    await Post.findByIdAndUpdate(postId, { likeCount: post.likeCount, currentTxid: likeResponse.data.result });

        await Post.findByIdAndUpdate(postId, { likeCount: post.likeCount,currentTxid:likeResponse.data.result });

        // Make a POST request to the like API endpoint
        let updatedpost = await Post.findById(postId);

        response.status(200).json({ message: 'Post liked successfully', updatedpost });
    } catch (error) {
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