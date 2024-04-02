import React from 'react'

import { AppBar, Toolbar, styled } from '@mui/material'; 


const Component = styled(AppBar)`
    background: linear-gradient(to bottom, #800000, black);
    ${'' /* background: #800000; */}
    color: white;
    bottom:0;
    height:80px;
    position:fixed;
    top:calc(100vh - 80px);
    
`;

const Container = styled(Toolbar)`
    justify-content: center;
    font-size:1rem;
    color:#cdc9c9;
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
