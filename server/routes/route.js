import express from 'express';

import { createPost, updatePost, deletePost, getPost, getAllPosts,getImage } from '../controller/post-controller.js';
import { uploadImage } from '../controller/image-controller.js';
import {  likePost} from '../controller/like-controller.js';
import { loginUser, singupUser, logoutUser } from '../controller/user-controller.js';
import { authenticateToken, createNewToken } from '../controller/jwt-controller.js';

import multer from 'multer';


const upload = multer({dest:'uploads/'});
const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.post('/create', upload.single('file'),authenticateToken, createPost)

// Set up multer storage
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './uploads'); // Set upload destination
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname); // Set filename
//     }
// });

// Create multer instance


router.post('/login', loginUser);
router.post('/signup', singupUser);
router.post('/logout', logoutUser);

router.post('/token', createNewToken);

router.post('/create',authenticateToken, createPost);
router.put('/update/:id', authenticateToken, updatePost);
router.delete('/delete/:id', authenticateToken, deletePost);

router.get('/post/:id', getPost);
router.get('/posts',  getAllPosts);

// router.post('/file/upload', upload.single('file'), uploadImage);
router.get('/file/:id', getImage);

// router.post('/comment/new', authenticateToken, newComment);
router.get('/like/:id', likePost);
// router.delete('/comment/delete/:id', authenticateToken, deleteComment);
 
router.post('/comment/new', authenticateToken, newComment);
router.get('/comments/:id', authenticateToken, getComments);
router.delete('/comment/delete/:id', authenticateToken, deleteComment);

export default router;