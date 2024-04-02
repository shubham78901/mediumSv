
import { Box, styled, Typography, Link } from '@mui/material';
import { GitHub, Instagram, Email } from '@mui/icons-material';
import About from '../about/About';

const Banner = styled(Box)`
    background-image: url(https://images.pexels.com/photos/207456/pexels-photo-207456.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1);
    width: 100%;
    height: 50vh;
    background-position: left 0px top -100px;
    background-size: cover;
    opacity:0.7;
`;
const Heading = styled(Box)`
  display: flex;
  width: fit-content;
  position: relative;
  margin-top:-230px;
  margin-bottom:150px;
  left: 40%;
  font-size: 3.5rem;
  color: black;
  font-weight: 700;
  justify-content:center;
  align-items:center;
  padding-bottom:2px;
  border-bottom: 2px solid rgb(10 148 205);
`;

const Wrapper = styled(Box)`
    padding: 20px;
    & > h3, & > h5 {
        margin-top: 50px;
    }
`;

const Text = styled(Typography)`
    color: #878787;
`;


const Contact = () => {
    return (
        <Box>
            <About/>
            <Banner />
            <Heading 
            // style={{
            //     borderBottom: "1px solid linear-gradient(to right, rgba(79, 232, 214) , rgba(98, 172, 236))",
            // }}
            >Contact US</Heading>
            <Wrapper>
                <Typography variant="h3">Getting in touch is easy!</Typography>    
                <Text variant="h5">
                    Reach out to me on
                    <Link href="https://www.instagram.com/codeforinterview/" color="inherit" target="_blank">
                        <Instagram/>
                    </Link>
                    or send me an Email 
                    <Link href="mailto:codeforinterview@gmail.com?Subject=This is a subject" target="_blank" color="inherit">
                        <Email />
                    </Link>.
                </Text>
            </Wrapper>
        </Box>
    );
}

export default Contact;