import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Grid, Card, Typography, Button, CardMedia } from '@mui/material';

const BlogList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [blogPosts, setBlogPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(location.search.split('=')[1] || '');
  const [imagesData, setImagesData] = useState({});

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
            <Card sx={{ cursor: 'pointer' }} onClick={() => handleBlogClick(post._id)}>
              {imagesData[post._id] && (
                <CardMedia
                  component="img"
                  height="200"
                  image={imagesData[post._id]}
                  alt={post.heading}
                />
              )}
              <Box p={2}>
                <Typography variant="h5" gutterBottom>
                  {post.heading}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.text}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.status}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BlogList;

