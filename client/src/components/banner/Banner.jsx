
import { styled, Box, Typography } from '@mui/material';
// import featured from '../../assert/featured.jpg'

const Image = styled(Box)`
    width: 100%;
    background: url(https://images.pexels.com/photos/5472314/pexels-photo-5472314.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1) center center/cover no-repeat #000;
    height: 50vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    opacity:0.8;
`;

const Heading = styled(Typography)`
    font-size: 70px;
    color: inherit;
    font-weight:700;
    line-height: 1;
    opacity:1;
`;

const SubHeading = styled(Typography)`
    font-size: 20px;
    background: #FFFFFF;
    padding:0 10px;
    border-radius:4px;
    margin-top:10px;
    color:inherit;
    font-weight:600;
    opacity:1;
    
`;

const Banner = () => {
    
    return (
<<<<<<< HEAD
        <Image>
            <Heading>mediumSv</Heading>
            <SubHeading>Unleash Your Creativity and Earn Crypto: Dive into the World of Medium SV!</SubHeading>
=======
        <Image >
            <Heading>mediumSv</Heading>
            <SubHeading>Subheading</SubHeading>
>>>>>>> 69f33a480ccf997696320e2d760b557b2561c54b
        </Image>
    )
}

export default Banner;