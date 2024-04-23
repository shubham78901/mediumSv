import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { Box, Grid, Card, CardContent, Typography, Button, IconButton } from '@mui/material';
import { FaThumbsUp, FaShareAlt } from 'react-icons/fa';
import { CardMedia } from '@mui/material';

const BlogListContainer = styled(Box)`
  margin-top: 20px;
  margin-bottom: 40px;
`;

const CategoryButton = styled(Button)`
  margin-right: 10px;
`;

const BlogCard = styled(Card)`
  cursor: pointer;
  height: 100%;
`;

const BlogHeading = styled(Typography)`
  font-size: 18px;
  font-weight: bold;
`;

const SubHeading = styled(Typography)`
  font-size: 16px;
`;

const Username = styled(Typography)`
  font-size: 14px;
`;

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
          try {
            const imageResponse = await axios.get(`http://localhost:8000/file/${post._id}`);
            const hex = imageResponse.data.result;
        
            // Convert hexadecimal data to binary and create Blob and URL
            const byteArray = new Uint8Array(hex.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));
            const imageBlob = new Blob([byteArray], { type: 'image/jpeg' });
            const imageUrl = URL.createObjectURL(imageBlob);
        
            return { id: post._id, imageUrl };
          } catch (error) {
            console.error(`Error fetching image for post ${post._id}:`, error);
            // Handle error - you can return a default image URL or null here
            return { id: post._id, imageUrl: 'default-image-url.jpg' };
          }
        });
        const images = await Promise.all(fetchImagePromises);
        setImagesData(images.reduce((acc, image) => ({ ...acc, [image.id]: image.imageUrl }), {}));

        const fetchLikesPromises = response.data.map(async (post) => {
          const likesResponse = await axios.get(`http://localhost:8000/post/${post._id}`);
          return { id: post._id, likes: likesResponse.data.updatedpost.likeCount };
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
    <BlogListContainer>
      <Box mb={4} textAlign="center">
        <CategoryButton
          variant={!selectedCategory ? 'contained' : 'outlined'}
          onClick={() => handleCategoryChange('')}
        >
          All
        </CategoryButton>
        {['Technology', 'Business', 'Entertainment', 'Sports', 'Lifestyle'].map((category) => (
          <CategoryButton
            key={category}
            variant={selectedCategory === category ? 'contained' : 'outlined'}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </CategoryButton>
        ))}
      </Box>

      <Grid container spacing={5} justifyContent="center">
        {blogPosts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post._id}>
            <BlogCard onClick={() => handleBlogClick(post._id)}>

                            {imagesData[post._id] && (
                              <CardMedia
                                component="img"
                                height="200"
                                image={imagesData[post._id]}
                                alt={post.heading}
                              />
                            )}
              <CardContent>
                <BlogHeading variant="h5" gutterBottom>
                  {post.heading}
                </BlogHeading>
                <SubHeading variant="subtitle1" color="text.secondary" gutterBottom>
                  {post.subHeading}
                </SubHeading>
                <Username variant="body2" color="text.secondary">
                  {post.username}
                </Username>
              </CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
                <IconButton onClick={() => handleLike(post._id)} color={isLiked[post._id] ? 'primary' : 'default'}>
                  <FaThumbsUp />
                </IconButton>
                <Typography variant="body2">{likesData[post._id] || 0} Likes</Typography>
                <IconButton onClick={() => handleShare(window.location.href)}>
                  <FaShareAlt />
                </IconButton>
              </Box>
            </BlogCard>
          </Grid>
        ))}
      </Grid>
    </BlogListContainer>
  );
};

export default BlogList;
