import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, Paper, Divider, Avatar, IconButton, Grid, Button } from '@mui/material';
import { FaCalendarAlt, FaShareAlt, FaThumbsUp } from 'react-icons/fa';
import Navbar from '../navbar/navbar';
import Footer from '../footer/Footer';
import toast, { Toaster } from 'react-hot-toast';

const BlogDetails = () => {
  const { id } = useParams();
  const [blogPost, setBlogPost] = useState(null);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [imageData, setImageData] = useState('');
  const [likeTransactionId, setLikeTransactionId] = useState('');

  const authToken = sessionStorage.getItem('accessToken');

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/post/${id}`);
        const { heading, subheading, content, likes, isLiked, likeCount } = response.data;
        console.log('likeCount:', likeCount);
        setBlogPost({ heading, subheading, content });
        setLikes(likeCount || 0); // Use likeCount for consistency
        setIsLiked(isLiked || false);
      } catch (error) {
        console.error('Error fetching blog post:', error);
      }
    };
    
    const fetchLikes = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/post/${id}`);
        setLikes(response.data.likeCount || 0); // Update likes based on likeCount
      } catch (error) {
        console.error('Error fetching likes:', error);
        toast.error('Failed to fetch likes', {
          duration: 5000,
        });
        setLikes(blogPost?.likes || 0); // Use the initial like count from the blog post
      }
    };
    
    const fetchImage = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/file/${id}`);
        const hex = response.data.result;
        if (hex.length % 2) {
          console.log('Hex string length is odd.');
          return;
        }
        const binary = [];
        for (let i = 0; i < hex.length / 2; i++) {
          const h = hex.substr(i * 2, 2);
          binary[i] = parseInt(h, 16);
        }
        const byteArray = new Uint8Array(binary);
        const imageBlob = new Blob([byteArray], { type: 'application/octet-stream' });
        const imageUrl = URL.createObjectURL(imageBlob);
        setImageData(imageUrl);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchBlogPost();
    fetchLikes();
    fetchImage();
  }, [id, blogPost?.likes]);

  const handleLike = async () => {
    try {
      const authToken = sessionStorage.getItem('accessToken');
      if (!authToken) {
        console.error('Auth token not found in sessionStorage.');
        return;
      }
  
      const response = await axios.get(`http://localhost:8000/like/${id}`, {
        headers: {
          authorization: authToken,
        },
      });
  
      if (response.data.message === 'Post liked successfully') {
  
        toast.success(`Post liked successfully!`, {
          duration: 5000,
        });
  
        setLikes((prevLikes) => prevLikes + 1);
        setIsLiked(true);
      } else {
        toast.error('Failed to like post. Please try again later.', {
          duration: 5000,
        });
      }
    } catch (error) {
      console.error('Error liking post:', error);
      toast.error('Failed to like post. Please try again later.', {
        duration: 5000,
      });
    }
  };
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert('URL copied to clipboard!');
    } catch (error) {
      console.error('Error copying URL:', error);
      alert('Failed to copy URL!');
    }
  };

  if (!blogPost) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="blog-details-container">
        <Toaster />
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper elevation={3} className="blog-details-paper">
              <Box mb={4}>
                <Typography variant="h4" gutterBottom>
                  {blogPost.heading}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {blogPost.subheading}
                </Typography>
              </Box>

              <Box mb={4}>
                <Typography variant="body1" gutterBottom>
                  {blogPost.content}
                </Typography>
              </Box>

              {imageData && (
                <div className="image-wrapper">
                  <img src={imageData} alt="" />
                </div>
              )}

              {/* Like button */}
              <Divider />
              <Box mt={4} mb={2} display="flex" alignItems="center">
                <IconButton className={`like-button ${isLiked ? 'liked' : ''}`} onClick={handleLike}>
                  <FaThumbsUp />
                </IconButton>
                <Typography variant="body2" ml={1}>
                  {likes} Likes
                </Typography>
              </Box>
              <Divider />
              <Divider />

              <Box mt={4} display="flex" alignItems="center" justifyContent="space-between">
                {/* Other content */}
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            {/* Optional sidebar or additional content */}
          </Grid>
        </Grid>
      </div>
      <Footer />

      <style jsx>{`
        .blog-details-container {
          margin-top: 4rem;
          margin-bottom: 8rem;
          padding: 2rem;
        }

        @media (max-width: 768px) {
          .blog-details-container {
            padding: 1rem;
          }
        }

        .blog-details-paper {
          padding: 2rem !important;
        }

        .image-wrapper {
          max-width: 100%;
          height: auto;
          overflow: hidden;
          border-radius: 8px;
          margin-bottom: 2rem;
        }

        .image-wrapper img {
          width: 100%;
          height: auto;
          object-fit: cover;
        }

        .like-button {
          color: #333;
          transition: color 0.3s ease;
        }

        .like-button.liked {
          color: #1976d2;
        }

        .like-button:hover {
          color: #1976d2;
        }

        .share-button {
          display: flex;
          align-items: center;
          color: #333;
          transition: color 0.3s ease;
        }

        .share-button:hover {
          color: #1976d2;
        }
      `}</style>
    </div>
  );
};

export default BlogDetails;
