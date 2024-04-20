import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Grid, Card, CardContent, Typography, Button, CardMedia, IconButton } from '@mui/material';
import { FaThumbsUp, FaShareAlt } from 'react-icons/fa';

const BlogList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [blogPosts, setBlogPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(location.search.split('=')[1] || '');
  const [imagesData, setImagesData] = useState({});
  const [likesData, setLikesData] = useState({});
  const [isLiked, setIsLiked] = useState({});
  const authToken = sessionStorage.getItem('accessToken');

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/posts?category=${selectedCategory}`);
        setBlogPosts(response.data);
        const fetchImagePromises = response.data.map(async (post) => {
          const imageResponse = await axios.get(`http://localhost:8000/file/${post._id}`);
          const hex = imageResponse.data.result;
          const binary = [];
          for (let i = 0; i < hex.length / 2; i++) {
            const h = hex.substr(i * 2, 2);
            binary[i] = parseInt(h, 16);
          }
          const byteArray = new Uint8Array(binary);
          const imageBlob = new Blob([byteArray], { type: 'application/octet-stream' });
          const imageUrl = URL.createObjectURL(imageBlob);
          return { id: post._id, imageUrl };
        });
        const images = await Promise.all(fetchImagePromises);
        setImagesData(images.reduce((acc, image) => ({ ...acc, [image.id]: image.imageUrl }), {}));

        const fetchLikesPromises = response.data.map(async (post) => {
          const likesResponse = await axios.get(`http://localhost:8000/like/${post._id}`);
          return { id: post._id, likes: likesResponse.data.likeCount };
        });
        const likes = await Promise.all(fetchLikesPromises);
        setLikesData(likes.reduce((acc, like) => ({ ...acc, [like.id]: like.likes }), {}));
        setIsLiked(likes.reduce((acc, like) => ({ ...acc, [like.id]: false }), {}));
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    };

    fetchBlogPosts();
  }, [selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    navigate(`?category=${category}`);
  };

  const handleBlogClick = (id) => {
    navigate(`/posts/${id}`);
  };

  const handleLike = async (id) => {
    if (!isLiked[id]) {
      try {
        const response = await axios.put(`http://localhost:8000/update/${id}`);
        setLikesData((prevLikesData) => ({
          ...prevLikesData,
          [id]: prevLikesData[id] + 1,
        }));
        setIsLiked((prevIsLiked) => ({
          ...prevIsLiked,
          [id]: true,
        }));
      } catch (error) {
        console.error('Error liking post:', error);
      }
    }
  };

  const handleShare = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      alert('URL copied to clipboard!');
    } catch (error) {
      console.error('Error copying URL:', error);
      alert('Failed to copy URL!');
    }
  };

  return (
    <Box mt={4} mb={8}>
      <Box mb={4}>
        <Button
          variant={!selectedCategory ? 'contained' : 'outlined'}
          onClick={() => handleCategoryChange('')}
          sx={{ mr: 2 }}
        >
          All
        </Button>
        {['Technology', 'Business', 'Entertainment', 'Sports', 'Lifestyle'].map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'contained' : 'outlined'}
            onClick={() => handleCategoryChange(category)}
            sx={{ mr: 2 }}
          >
            {category}
          </Button>
        ))}
      </Box>

      <Grid container spacing={4}>
        {blogPosts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post._id}>
            <Card sx={{ cursor: 'pointer' }}>
              <Box onClick={() => handleBlogClick(post._id)}>
                {imagesData[post._id] && (
                  <CardMedia
                    component="img"
                    height="140"
                    image={imagesData[post._id]}
                    alt={post.heading}
                  />
                )}
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    {post.heading}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    {post.subheading}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {post.articalauthor}
                  </Typography>
                </CardContent>
              </Box>
              <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
                <IconButton onClick={() => handleLike(post._id)} color={isLiked[post._id] ? 'primary' : 'default'}>
                  <FaThumbsUp />
                </IconButton>
                <Typography variant="body2">{likesData[post._id] || 0} Likes</Typography>
                <IconButton onClick={() => handleShare(window.location.href)}>
                  <FaShareAlt />
                </IconButton>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BlogList;
