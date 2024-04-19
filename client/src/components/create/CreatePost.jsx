import React, { useState } from 'react';
import axios from 'axios';
import { FaImage, FaCalendarAlt, FaPaperPlane } from 'react-icons/fa';
import Footer from '../footer/Footer';
import Navbar from '../navbar/navbar';
import toast, { Toaster } from 'react-hot-toast';

const CreatePost = () => {
  const [postData, setPostData] = useState({
    category: '',
    subheading: '',
    heading: '',
    articalauthor: '',
    publishdate: new Date().toISOString().slice(0, 10),
    likefee: '',
    sharereward: '',
    content: '',
    file: null,
  });

  const categories = ['Technology', 'Business', 'Entertainment', 'Sports', 'Lifestyle'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setPostData((prevData) => ({
      ...prevData,
      file: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const authToken = sessionStorage.getItem('accessToken');
    if (!authToken) {
      console.error('Authentication token is missing');
      return;
    } else {
      console.log(authToken);
    }
  
    const formData = new FormData();
    formData.append('category', postData.category);
    formData.append('subheading', postData.subheading);
    formData.append('heading', postData.heading);
    formData.append('articalauthor', postData.articalauthor);
    formData.append('publishdate', postData.publishdate);
    formData.append('likefee', postData.likefee);
    formData.append('sharereward', postData.sharereward);
    formData.append('content', postData.content);
    formData.append('file', postData.file);
  
    try {
      const response = await axios.post('http://localhost:8000/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: authToken,
        },
      });
    
      console.log('Post creation response:', response.data); // Log the response data
    
      // Fetch the transaction ID from the /post/:id endpoint
      const postResponse = await axios.get(`http://localhost:8000/post/${response.data.id}`);
      const transactionId = postResponse.data.deployTxid;
    
      toast.success(`Post created successfully! Transaction ID: ${transactionId}`, {
        duration: 5000,
      });
    
      // Reset form data
      setPostData({
        category: '',
        subheading: '',
        heading: '',
        articalauthor: '',
        publishdate: new Date().toISOString().slice(0, 10),
        likefee: '',
        sharereward: '',
        content: '',
        file: null,
      });
      console.log('Transaction ID:', transactionId); // Log the transaction ID
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('Failed to create post', {
        duration: 5000,
      });
    }
    
  };  return (
    <div>
      <Navbar/>
    <div className="create-post-container">
    <Toaster />
      <div className="create-post-card">
        <h2 className="create-post-title">Create a New Post</h2>
        <form onSubmit={handleSubmit} className="create-post-form">
          <div className="form-group">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={postData.category}
              onChange={handleInputChange}
              className="form-input form-select"
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="heading" className="form-label">
              Heading
            </label>
            <input
              type="text"
              id="heading"
              name="heading"
              value={postData.heading}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="subheading" className="form-label">
              Subheading
            </label>
            <input
              type="text"
              id="subheading"
              name="subheading"
              value={postData.subheading}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="articalauthor" className="form-label">
              Article Author
            </label>
            <input
              type="text"
              id="articalauthor"
              name="articalauthor"
              value={postData.articalauthor}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="publishdate" className="form-label">
              Publish Date
            </label>
            <div className="form-input-with-icon">
              <input
                type="date"
                id="publishdate"
                name="publishdate"
                value={postData.publishdate}
                onChange={handleInputChange}
                className="form-input"
                required
              />
              <FaCalendarAlt className="form-input-icon" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="content" className="form-label">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={postData.content}
              onChange={handleInputChange}
              className="form-input form-textarea"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="file" className="form-label">
              Upload File
            </label>
            <div className="form-input-with-icon">
              <input
                type="file"
                id="file"
                name="file"
                onChange={handleFileChange}
                className="form-input"
                required
              />
              <FaImage className="form-input-icon" />
            </div>
          </div>
          <div className="form-group">
      <div className="logo-container">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKcO-EZnZOrZ7cEKzd79E1tPqNvfgfq6dyRw&s" alt="Logo" className="logo" height={60} />
      </div>
      <label htmlFor="buymeacoffee" className="form-label">
        Buy me a coffee
      </label>
      <input
        type="text"
        id="buymeacoffee"
        name="likefee"
        value={postData.likefee}
        onChange={handleInputChange}
        className="form-input"
        required
      />
    </div>

          <button type="submit" className="submit-button">
            <FaPaperPlane />
           Publish!
          </button>
        </form>
      </div>
      <style jsx>{`
        .create-post-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: inherit;
          background-color: #f5f8fa;
        }

        .create-post-card {
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          padding: 24px;
          width: 600px;
        }

        .create-post-title {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 24px;
        }

        .create-post-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-label {
          font-size: 14px;
          font-weight: 600;
          color: #657786;
        }

        .form-input {
          padding: 12px 16px;
          border: 1px solid #e6ecf0;
          border-radius: 4px;
          font-size: 16px;
          color: #14171a;
          background-color: #f5f8fa;
          transition: border-color 0.3s ease;
        }

        .form-input:focus {
          outline: none;
          border-color: #1da1f2;
        }

        .form-select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
          background-size: 24px;
        }

        .form-textarea {
          resize: vertical;
          min-height: 120px;
        }

        .form-input-with-icon {
          display: flex;
          align-items: center;
          position: relative;
        }

        .form-input-icon {
          position: absolute;
          right: 12px;
          color: #657786;
        }

        .submit-button {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          background-color: #1da1f2;
          color: #fff;
          border: none;
          border-radius: 4px;
          padding: 12px 16px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .submit-button:hover {
          background-color: #0c8eff;
        }
      `}</style>
    </div>
    <Footer/>
    </div>
  );
};

export default CreatePost;