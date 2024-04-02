
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
        <Image >
            <Heading>mediumSv</Heading>
            <SubHeading>Subheading</SubHeading>
        </Image>
    )
}

export default Banner;