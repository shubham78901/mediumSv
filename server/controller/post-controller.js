import axios from 'axios';
import FormData from 'form-data';
import Post from '../model/post.js'; // Import the Post model
import multer from 'multer';








// Create multer instance


export const createPost = async (req, res) => {
    try {
        const {
            authtoken,
            sharereward,
            likefee,
            publishdate,
            heading,
            subheading,
            category,
            articalauthor,
            content,
        } = req.body;

        // If no file was uploaded
        if (!req.file) {
            console.error('No file uploaded');
            return res.status(400).json({ success: false, error: 'No file uploaded' });
        }

        // Create FormData object for multipart/form-data
        const formData = new FormData();
        formData.append("file", req.file); // Add uploaded file
        formData.append('authtoken', authtoken);
        formData.append('sharereward', sharereward);
        formData.append('likefee', likefee);
        formData.append('publishdate', publishdate);
        formData.append('heading', heading);
        formData.append('subheading', subheading);
        formData.append('category', category);
        formData.append('articalauthor', articalauthor);
        formData.append('content', content);

        // Make the POST request to mint the token
        const mintResponse = await axios.post('http://localhost:5000/custom/mint', formData, {
            headers: {
                ...formData.getHeaders(),
            }
        });

        console.log('Minting response:', mintResponse.data);

        // If the minting is successful
        if (mintResponse.data.success) {
            // Save the post to MongoDB
            const newPost = new Post({
                heading,
                subHeading: subheading, // Correct the field name to match the schema
                description: content, // Assuming content is the description
                picture: '', // You may fill this based on your requirements
                username: articalauthor, // Assuming articalauthor is the username
                categories: category, // Assuming category is an array
                publishDate: publishdate,
                likeCount: 0, // Initialize likeCount to 0
                shareCount: 0, // Initialize shareCount to 0
                deployTxid: mintResponse.data.mintResult.deploytxid, // Update with minted data
                currentTxid: mintResponse.data.mintResult.currenttxid, // Update with minted data
                fileHex: mintResponse.data.mintResult.filehex, // Update with minted data
                authorPubkey: mintResponse.data.mintResult.authorpubkey, // Update with minted data
                shareReward: sharereward, // Assuming sharereward is the shareReward
                likeReward: likefee, // Assuming likefee is the likeReward
                content // Save the content as is
            });

            await newPost.save(); // Save the post to MongoDB

            res.status(200).json({ message: 'Post saved successfully', post: newPost });
        } else {
            res.status(500).json({ error: 'Error minting token', details: mintResponse.data.error });
        }
    } catch (error) {
        // Handle error
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
    let username = request.query.username;
    let category = request.query.category;
    let posts;
    try {
        if(username) 
            posts = await Post.find({ username: username });
        else if (category) 
            posts = await Post.find({ categories: category });
        else 
            posts = await Post.find({});
            
        response.status(200).json(posts);
    } catch (error) {
        response.status(500).json(error)
    }
}