import React from 'react'

import { AppBar, Toolbar, styled } from '@mui/material'; 


const Component = styled(AppBar)`
    background: linear-gradient(to bottom, rgba(98, 172, 236), rgba(79, 232, 214)); 
    bottom:0;
    height:80px;
    position:fixed;
    top:calc(100vh - 80px);
    
`;

const Container = styled(Toolbar)`
    justify-content: center;
    font-size:1rem;
    color:#0e0e0e;
`

const Footer = () => {
  return (
    <Component>
            <Container>
                copyright &copy; | all rights resereved
            </Container>
        </Component>
  )
}

export default Footer;
