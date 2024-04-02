
import { styled, Box, Typography } from '@mui/material';

const Container = styled(Box)`
    border: 1px solid #e2e2e2;
    border-radius: 10px;
    margin: 10px;
    display: flex;
    background:white;
    flex-direction: column;
    height: 350px;
    & > img, & > p {
        ${'' /* padding: 0 5px 5px 5px; */}
    }
    &:hover{
        box-shadow:0px 8px 32px 5px rgba(0,0,0, 0.12);
    }
`;
const CardDesc = styled(Box)`
    padding:4px 10px;
`;
const TopDesc = styled(Box)`
    display:flex;
    justify-content:space-between;
    padding-bottom:20px;
`;

const Image = styled('img')({
    width: '100%',
    objectFit: 'cover',
    borderRadius: '10px 10px 0 0',
    height: 150
});

const Text = styled(Typography)`
    color: #878787;
    font-size: 15px;
`;

const Heading = styled(Typography)`
    font-size: 20px;
    font-weight: 700;
`;

const Details = styled(Typography)`
    font-size: 15px;
    word-break: break-word;
    color: gray;
`;

const Post = ({ post }) => {
    const url = post.picture ? post.picture : 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80';
    
    const addEllipsis = (str, limit) => {
        return str.length > limit ? str.substring(0, limit) + '...' : str;
    } 

    return (
        <Container>
            <Image src={url} alt="post" />
            <CardDesc>
            <TopDesc>

            <Text
            style={{
                display:"flex",
            }}
            >Author: {post.username}</Text>
            <Text>{post.categories}</Text>
            
            </TopDesc>
            <Heading
            style={{
                display:"flex",
                marginBottom:"10px",
            }}
            >{addEllipsis(post.title, 20)}</Heading>
            <Details>{addEllipsis(post.description, 100)}</Details>
            </CardDesc>
        </Container>
    )
}

export default Post;