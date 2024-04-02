import React, { useState, useEffect, useContext } from "react";

import {
  styled,
  Box,
  TextareaAutosize,
  Button,
  InputBase,
  FormControl,
} from "@mui/material";
import { AddCircle as Add } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

import { API } from "../../service/api";
import { DataContext } from "../../context/DataProvider";
import coffee from "../../assert/coffee.jpg"
import featured from "../../assert/featured.jpg"

const Container = styled(Box)(({ theme }) => ({
  margin: "50px 100px",
  [theme.breakpoints.down("md")]: {
    margin: 0,
  },
}));

const Image = styled("img")({
  width: "100%",
  height: "50vh",
  objectFit:"cover",
  
});

const StyledFormControl = styled(FormControl)`
  margin-top: 10px;
  margin-bottom: 20px;
  display: flex;
  width:100%;
  flex-direction: row;
`;
const StyledFormControlOne = styled(FormControl)`
  margin-top: 10px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
`;
const StyledFormControlTwo = styled(FormControl)`
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  width:100%;
 flex-direction: row;
`;

const Text = styled("span")`
  font-size: 1.2rem;
  padding-left: 10px;
  color: white;
  font-weight: 600;
`;

const InputTextField = styled(InputBase)`
  flex: 1;
  ${"" /* margin-left: 10px; */}
  font-size: 25px;
  &:focus-visible {
    border:1px solid blue;
  }
`;

const Textarea = styled(TextareaAutosize)`
  width: calc(100% - 30px);
  margin: 25px 0px;
  display: flex;
  height: 100px !important;
  flex-wrap: wrap;
  border: 1px solid black;
  border-radius: 5px;
  padding: 15px 15px;
  box-shadow: 0px 3px 4px 0px rgba(0, 0, 0, 0.20);
  font-size: 15px;
  &:focus-visible {
    outline: none;
  }
`;

const initialPost = {
  title: "",
  subheading: "",
  description: "",
  picture: "",
  username: "",
  categories: "",
  createdDate: new Date(),
};

const CreatePost = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [post, setPost] = useState(initialPost);
  const [file, setFile] = useState("");
  const { account } = useContext(DataContext);

  const url = post.picture
    ? post.picture
    : featured;
  console.log(file)
  useEffect(() => {
    const getImage = async () => {
      console.log(file)
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);
        console.log(data)

        const response = await API.uploadFile(data);
        post.picture = response.data? response.data: featured;
      }
    };
    getImage();
    
    post.categories = location.search?.split("=")[1] || "All";
    post.username = account.username;
  }, [file]);

  const savePost = async () => {
    console.log(post)
    await API.createPost(post);
    navigate("/");
  };

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  return (
    <Container>
    <StyledFormControl>
      <Image src={url} alt="post" />
      <label
          htmlFor="fileInput"
          style={{
            display: "flex",
            width: "50%",
            position:"absolute",
            // margin:"50% 50%",
            top:"40%",
            left:"25%",
            border: "1px solid black",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "5px",
            padding: "10px",
            cursor: "pointer",
            boxShadow: "2px 2px 4px 2px rgba(256, 256, 256, 0.60)",
          }}
        >
          <Add fontSize="large" color="s" />
          <Text>Upload image</Text>
        </label>
        <input
          type="file"
          id="fileInput"
          style={{
            display: "none",
          }}
          onChange={(e) => setFile(e.target.files[0])}
          // onChange={(e) => setFile(e.target.files[0])}
        />

    </StyledFormControl>

      <StyledFormControlOne>
        
        <InputTextField
          onChange={(e) => handleChange(e)}
          name="title"
          placeholder="Title"
          style={{
            display: "flex",
            flex: 2,
            width: "100%",
            border: "1px solid black",
            borderRadius: "5px",
            padding: "0px 20px",
            boxShadow: "0 3px 4px 0 rgba(0, 0, 0, 0.20)",
          }}
        />
      </StyledFormControlOne>
      <StyledFormControlTwo>
        <InputTextField
          onChange={(e) => handleChange(e)}
          name="subheading"
          placeholder="Subheading"
          style={{
            display: "flex",
            flex:3,
            border: "1px solid black",
            borderRadius: "5px",
            padding: "0px 20px",
            boxShadow: "0 3px 4px 0 rgba(0, 0, 0, 0.20)",
            fontSize: "18px",
          }}
        />
        <InputTextField
          onChange={(e) => handleChange(e)}
          name="username"
          placeholder="Author"
          style={{
            display: "flex",
            flex:1,
            border: "1px solid black",
            borderRadius: "5px",
            padding: "0px 18px",
            boxShadow: "0 3px 4px 0 rgba(0, 0, 0, 0.20)",
            margin: "0 10px",
            fontSize: "18px",
          }}
        />
        <InputTextField
          onChange={(e) => handleChange(e)}
          name="categories"
          placeholder="categories"
          style={{
            display: "flex",
            flex:1,
            border: "1px solid black",
            borderRadius: "5px",
            padding: "0px 18px",
            boxShadow: "0 3px 4px 0 rgba(0, 0, 0, 0.20)",
            fontSize: "18px",
          }}
        />
        <InputTextField
          onChange={(e) => handleChange(e)}
          name="price"
          type="number"
          placeholder="Buy me a coffee"
          style={{
            display: "flex",
            flex:1,
            border: "1px solid black",
            borderRadius: "5px",
            padding: "0px 18px",
            paddingRight:"40px",
            marginLeft: "10px",
            boxShadow: "0 3px 4px 0 rgba(0, 0, 0, 0.20)",
            fontSize: "15px",
          }}
        />
        <img src={coffee} alt="coffee" style={{
            width:"40px",
            height:"30px",
            display:"flex",
            position:"absolute",
            right:"4px",
            background:"transparent",
            marginTop:"3px"
        }}/>
      </StyledFormControlTwo>

      <Textarea
        rowsMin={5}
        placeholder="Tell your story..."
        name="description"
        onChange={(e) => handleChange(e)}
      />
      
      <Button onClick={() => savePost()} variant="contained" 
      sx={{
          ':hover': {
            "background": 'red',
            color: 'white',
          },
        }}
      style={{
        display:"Block",
        margin:"auto",
        padding:"5px 25px",
        background: "#43b943",
        // "&:hover":{backgroundColor:"red"},
      }}
      // sx={{"&:hover":{backgroundColor:"red"}}}
      >
        Publish
      </Button>
    </Container>
  );
};

export default CreatePost;
