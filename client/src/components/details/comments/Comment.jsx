import { useContext } from "react";

import { Typography, Box, styled } from "@mui/material";
import { Delete } from '@mui/icons-material';

import { API } from '../../../service/api';
import { DataContext } from "../../../context/DataProvider";

const Component = styled(Box)`
    margin: 10px 20px 0 20px;
    background: #eff9fa;
    padding: 10px;
    border:1px solid #e2e2e2;
    border-radius:7px;
`;

const Container = styled(Box)`
    display: flex;
    margin-bottom: 5px;
`;

const Name = styled(Typography)`
    font-weight: 600;
    font-size: 18px;
    margin-right: 20px;
    font-family: "monospace";
`;

const StyledDate = styled(Typography)`
    font-size: 16px;
    color: #878787;
    font-family: "monospace";
`;

const DeleteIcon = styled(Delete)`
    margin-left: auto;
`;

const Comment = ({ comment, setToggle }) => {

    const { account } = useContext(DataContext)
    
    const removeComment = async () => {
       await API.deleteComment(comment._id);
       setToggle(prev => !prev);
    }

    return (
        <Component>
            <Container>
                <Name>{comment.name}</Name>
                <StyledDate>{new Date(comment.date).toDateString()}</StyledDate>
                { comment.name === account.username && <DeleteIcon onClick={() => removeComment()} /> }
            </Container>
            <Typography
            style={{
                padding:"5px 20px",
                color:"gray",
                fontFamily: "fangsong",
                fontSize:"18px",
            }}
            >{comment.comments}</Typography>
        </Component>
    )
}

export default Comment;