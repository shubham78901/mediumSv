import { useState, useEffect, useContext } from 'react';

import { Box, Typography, styled } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { Link, useNavigate, useParams } from 'react-router-dom'

import { API } from '../../service/api';

import { DataContext } from '../../context/DataProvider';

// components
import Comments from './comments/Comments';

const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    marginTop:"66px",
    [theme.breakpoints.down('md')]: {
        margin: 0
    },
}));

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
});

const EditIcon = styled(Edit)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
    ${'' /* &:hover{
        background:"#59daed7a";
    }, */}
`;

const DeleteIcon = styled(Delete)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
    cursor:pointer;
`;

const Heading = styled(Typography, Box)`
    font-size: 38px;
    font-weight: 600;
    text-align: center;
    font-family: fangsong;
    ${'' /* margin: 50px 0 10px 0; */}
    margin: 50px auto 10px auto;
    border-bottom: 2px solid rgb(10 148 205);
    border-radius:5px;
    width:fit-content;
`;

const Author = styled(Box)(({ theme }) => ({
    color: '#878787',
    display: 'flex',
    margin: '20px 23px',
    fontFamily: "monospace",
    [theme.breakpoints.down('sm')]: {
        display: 'block'
    },
}));

const DetailView = () => {
    const url = 'https://images.unsplash.com/photo-1707343843982-f8275f3994c5?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    
    const [post, setPost] = useState({});
    const { account } = useContext(DataContext);

    const navigate = useNavigate();
    const { id } = useParams();
    
    useEffect(() => {
        const fetchData = async () => {
            let response = await API.getPostById(id);
            if (response.isSuccess) {
                setPost(response.data);
            }
        }
        fetchData();
    }, []);

    const deleteBlog = async () => {  
        await API.deletePost(post._id);
        navigate('/')
    }

    return (
        <Container>
            <Image src={post.picture || url} alt="post" />
            <Box style={{ float: 'right' }}>
                {   
                    account.username === post.username && 
                    <>  
                        <Link to={`/update/${post._id}`}><EditIcon color="primary" sx={{ "&:hover": { background: "linear-gradient(to right, rgba(79, 232, 214, 0.3) , rgba(98, 172, 236, 0.5))" } }} /></Link>
                        <DeleteIcon onClick={() => deleteBlog()} color="error" sx={{ "&:hover": { background: "rgba(256, 0, 0, 0.2)", } }}/>
                    </>
                }
            </Box>
            <Heading>{post.title}</Heading>

            <Author>
                <Link to={`/?username=${post.username}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography>Author: <span style={{fontWeight: 600, fontFamily: "monospace"}}>{post.username}</span></Typography>
                </Link>
                <Typography style={{marginLeft: 'auto', fontFamily: "monospace"}}>{new Date(post.createdDate).toDateString()}</Typography>
            </Author>

            <Typography
            style={{
                border:"1px solid #e2e2e2",
                borderRadius: "7px",
                margin:"0 20px",
                padding:"20px",
                color:"#393b3d",
                fontSize: "18px",
                fontFamily: "emoji",
            }}
            >{post.description}</Typography>
            <Comments post={post} />
        </Container>
    )
}

export default DetailView;