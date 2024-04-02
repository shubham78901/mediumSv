
import { AppBar, Toolbar, styled, Button } from '@mui/material'; 
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';


const Component = styled(AppBar)`
    background: linear-gradient(to bottom, rgba(79, 232, 214) , rgba(98, 172, 236)); 
    color: white;
    
`;

const Container = styled(Toolbar)`
    justify-content: center;
    & > a {
        padding: 20px;
        color: #000;
        text-decoration: none;
        font-size: 1.2rem;
        font-family: cursive;
        font-weight: 700;
        letter-spacing: 5px;
        &:hover{
            color:white;
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
                {/* <Link to='/about'>ABOUT</Link> */}
                <Link to='/contact'>CONTACT</Link>
                <Link to='/account' onClick={logout}>LOGOUT</Link>
            </Container>
        </Component>
    )
}

export default Header;