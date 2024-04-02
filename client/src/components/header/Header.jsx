
import { AppBar, Toolbar, styled, Button } from '@mui/material'; 
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';


const Component = styled(AppBar)`
    background: linear-gradient(to bottom, black, #800000);
    ${'' /* background: #800000; */}
    color: white;
    
`;

const Container = styled(Toolbar)`
    justify-content: center;
    & > a {
        padding: 20px;
        color: #fff;
        text-decoration: none;
        font-size: 1.2rem;
        font-family: "Butterfly Kids", cursive;
        font-weight: 700;
        letter-spacing: 5px;
        &:hover{
            color:aqua;
        }
        
    }
`

const Header = () => {

    const navigate = useNavigate();

    // const logout = async () => navigate('/account');

    const logout = () => {
        
        sessionStorage.removeItem("accessToken")
        sessionStorage.removeItem("refreshToken")
    }
        
    return (
        <Component>
            <Container>
                <Link to='/'>HOME</Link>
                <Link to='/about'>ABOUT</Link>
                <Link to='/contact'>CONTACT</Link>
                <Link to='/account' onClick={logout}>LOGOUT</Link>
            </Container>
        </Component>
    )
}

export default Header;