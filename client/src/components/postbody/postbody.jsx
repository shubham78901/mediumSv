import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CardMedia,
  IconButton,
} from "@mui/material";
import { FaThumbsUp, FaShareAlt, FaComment, FaUser } from "react-icons/fa";

const BlogList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [blogPosts, setBlogPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(
    location.search.split("=")[1] || ""
  );
  const [imagesData, setImagesData] = useState({});
  const [likesData, setLikesData] = useState({});
  const [isLiked, setIsLiked] = useState({});

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/posts?category=${selectedCategory}`
        );
        setBlogPosts(response.data);
        const fetchImagePromises = response.data.map(async (post) => {
          const imageResponse = await axios.get(
            `http://localhost:8000/file/${post._id}`
          );
          const hex = imageResponse.data.result;
          const binary = [];
          for (let i = 0; i < hex.length / 2; i++) {
            const h = hex.substr(i * 2, 2);
            binary[i] = parseInt(h, 16);
          }
          const byteArray = new Uint8Array(binary);
          const imageBlob = new Blob([byteArray], {
            type: "application/octet-stream",
          });
          const imageUrl = URL.createObjectURL(imageBlob);
          return { id: post._id, imageUrl };
        });
        const images = await Promise.all(fetchImagePromises);
        setImagesData(
          images.reduce(
            (acc, image) => ({ ...acc, [image.id]: image.imageUrl }),
            {}
          )
        );

        const fetchLikesPromises = response.data.map(async (post) => {
          const likesResponse = await axios.get(
            `http://localhost:8000/like/${post._id}`
          );
          return {
            id: post._id,
            likes: likesResponse.data.updatedpost.likeCount,
          };
        });
        const likes = await Promise.all(fetchLikesPromises);
        setLikesData(
          likes.reduce((acc, like) => ({ ...acc, [like.id]: like.likes }), {})
        );
        setIsLiked(
          likes.reduce((acc, like) => ({ ...acc, [like.id]: false }), {})
        );
      } catch (error) {
        console.error("Error fetching blog posts:", error);
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
        console.error("Error liking post:", error);
      }
    }
  };

  const handleShare = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      alert("URL copied to clipboard!");
    } catch (error) {
      console.error("Error copying URL:", error);
      alert("Failed to copy URL!");
    }
  };

  const handleComment = async () => {
    navigate("/comments");
  };

  return (
    <div className="blog-list">
      <Box mb={4}>
        {" "}
        <Button
          variant={!selectedCategory ? "contained" : "outlined"}
          onClick={() => handleCategoryChange("")}
          style={{ marginRight: "8px" }}
        >
          {" "}
          All{" "}
        </Button>{" "}
        {["Technology", "Business", "Entertainment", "Sports", "Lifestyle"].map(
          (category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "contained" : "outlined"}
              onClick={() => handleCategoryChange(category)}
              style={{ marginRight: "8px" }}
            >
              {" "}
              {category}{" "}
            </Button>
          )
        )}{" "}
      </Box>
      {blogPosts.map((post) => (
        <div key={post._id} className="post-card">
          <div className="post-info">
            <img src={FaUser} alt="User" className="avatar" />
            <div>
              <h4 className="author">{post.articalauthor}</h4>
              <p className="date">{post.publishdate}</p>
            </div>
          </div>
          {imagesData[post._id] && (
            <img
              src={imagesData[post._id]}
              alt={post.heading}
              className="post-image"
            />
          )}
          <div className="post-content">
            <h3 className="post-header">{post.heading}</h3>
            <p className="post-subheading">{post.subheading}</p>
            <div className="action-bar">
              <div className="action-group">
                <button
                  onClick={() => handleLike(post._id)}
                  className={`action-button ${
                    isLiked[post._id] ? "active" : ""
                  }`}
                >
                  <FaThumbsUp />
                  <span className="action-count">
                    {likesData[post._id] || 0} Likes
                  </span>
                </button>
              </div>
              <div className="action-group">
                <button
                  onClick={() => handleComment(post._id)}
                  className="action-button"
                >
                  <FaComment />
                </button>
                <button
                  onClick={() => handleShare(window.location.href)}
                  className="action-button"
                >
                  <FaShareAlt />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}{" "}
      <style jsx>{`
        .blog-list {
          margin-top: 4rem;
          margin-bottom: 8rem;
          padding: 11rem;
        }

        .post-card {
          background-color: #fff;
          border-radius: 16px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          margin-bottom: 2rem;
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .post-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }

        .post-info {
          display: flex;
          align-items: center;
          padding: 1.5rem;
          border-bottom: 1px solid #f0f0f0;
        }

        .avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          margin-right: 1rem;
        }

        .author {
          font-size: 1rem;
          font-weight: 600;
          color: #333;
        }

        .date {
          font-size: 0.875rem;
          color: #666;
        }

        .post-image {
          width: 100%;
          max-height: 500px;
          object-fit: cover;
          border-radius: 16px 16px 0 0;
        }

        .post-content {
          padding: 1.5rem;
        }

        .post-header {
          font-size: 1.5rem;
          font-weight: 600;
          color: #3f51b5;
          margin-bottom: 0.5rem;
        }

        .post-subheading {
          font-size: 1rem;
          color: #666;
          margin-bottom: 1rem;
        }

        .action-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .action-group {
          display: flex;
          align-items: center;
        }

        .action-button {
          display: flex;
          align-items: center;
          background-color: transparent;
          border: none;
          color: #666;
          font-size: 1rem;
          padding: 0.5rem;
          cursor: pointer;
          transition: color 0.3s;
        }

        .action-button.active {
          color: #3f51b5;
        }

        .action-count {
          margin-left: 0.5rem;
        }
      `}</style>
    </div>
  );
};

export default BlogList;
