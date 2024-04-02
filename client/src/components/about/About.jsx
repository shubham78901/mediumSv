
import { Box, styled, Typography, Link } from '@mui/material';
import { GitHub, LinkedIn, Email } from '@mui/icons-material';

const Banner = styled(Box)`
    background-image: url("blog.png");
    width: 100%;
    height: 50vh;
    background-position: left 0px bottom 0px;
    background-size: cover;
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

const About = () => {

    return (
        <Box>
            <Banner/>
            <Wrapper>
                <Typography variant="h3"></Typography>
                <Text variant="h5">Embark on a journey where your words, thoughts, and creativity not only find a platform but also earn you crypto rewards! Medium SV isn't just another content-sharing platform.<br />
                it's a bustling hub where your articles, blogs, podcasts, and even memes can thrive while you reap the rewards in cryptocurrency. Join the revolution where creativity meets crypto, and let your content speak for itself while your wallet grows. Discover the power of Medium SV today!
                    <Box component="span" style={{ marginLeft: 5 }}>
                        <Link href="https://github.com/shubham78901" color="inherit" target="_blank"><GitHub /></Link>
                    </Box>
                </Text>
                <Text variant="h5">
                    Need something built or simply want to have chat? Reach out to me on
                    <Box component="span" style={{ marginLeft: 5 }}>
                        <Link href="www.linkedin.com/in/shubham-g-01b41a192/" color="inherit" target="_blank">
                            <LinkedIn />
                        </Link>
                    </Box>  
                        or send me an Email 
                        <Link href="mailto:ss363757@gmail.com?Subject=This is a subject" target="_blank" color="inherit">
                            <Email />
                        </Link>.
                </Text>
            </Wrapper>
        </Box>
    )
}

export default About;