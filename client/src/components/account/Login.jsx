import React, { useState, useEffect, useContext } from 'react';

import { TextField, Box, Button, Typography, styled } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';

const Component = styled(Box)`
    width: 400px;
    margin: auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
    ${'' /* display:flex; */}
    ${'' /* align-item:center; */}
`;

const Div = styled('div')({
    width: "100%",
    display: 'flex',
    "justify-content": "center",
    "align-items": "center",
    padding: '40px 0 0px 0',
    "font-size": "2rem",
    "font-weight": "700",
});
const Paragraph = styled('p')({
    width: "100%",
    display: 'flex',
    "justify-content": "center",
    "align-items": "center",
    "margin-top":"-4px",
    padding: '0px 0 0',
    "font-size": "1rem",
    "font-weight": "400",
    color: "gray",
});

const Wrapper = styled(Box)`
    padding: 15px 35px;
    display: flex;
    margin-top:-20px;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 20px;
    }   
`;

const LoginButton = styled(Button)`
    text-transform: none;
    background: linear-gradient(to right, rgb(79, 232, 214) , rgb(98, 172, 236));
    color: #000;
    font-weight: 600;
    font-size:1rem;
    height: 48px;
    border-radius: 5px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const SignupButton = styled(Button)`
    text-transform: none;
    background: linear-gradient(to right, rgb(79, 232, 214) , rgb(98, 172, 236));
    color: #000;
    font-weight: 600;
    font-size:1rem;
    height: 48px;
    border-radius: 5px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Text = styled(Typography)`
    color: #878787;
    font-size: 12px;
`;


const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`

const loginInitialValues = {
    username: '',
    password: ''
};

const signupInitialValues = {
    name: '',
    username: '',
    password: '',
};

const Login = ({ isUserAuthenticated }) => {
    const [login, setLogin] = useState(loginInitialValues);
    const [signup, setSignup] = useState(signupInitialValues);
    const [error, showError] = useState('');
    const [account, toggleAccount] = useState('login');
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');

    const navigate = useNavigate();
    const { setAccount } = useContext(DataContext);

    // const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';
    useEffect(()=>{
        if (sessionStorage.getItem("accessToken")){
            navigate("/")
        }
    },[])

    useEffect(() => {
        showError(false);
    }, [login])

    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    }

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    }

    const loginUser = async () => {
        let response = await API.userLogin(login);
        
        if (response.isSuccess) {
            showError('');

            sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
            sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
            setAccount({ name: response.data.name, username: response.data.username });
            
            isUserAuthenticated(true)
            setLogin(loginInitialValues);
            navigate(`/create?category=${category || ''}`);
        } else {
            showError('Something went wrong! please try again later');
        }
    }

    const signupUser = async () => {
        let response = await API.userSignup(signup);
        console.log("resp",response)
        if (response.isSuccess) {
            showError('');
            setSignup(signupInitialValues);
            toggleAccount('login');
        } else {
            showError('Something went wrong! please try again later');
        }
    }

    const toggleSignup = () => {
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
    }

    return (
        <Component>
            <Box>
                <Div>mediumSv</Div>
                <Paragraph>create your article with us</Paragraph>
                {/* <Image src={imageURL} alt="blog" /> */}
                {
                    account === 'login' ?
                        <Wrapper>
                            <TextField variant="standard" value={login.username} onChange={(e) => onValueChange(e)} name='username' label='Enter Username' />
                            <TextField variant="standard" value={login.password} onChange={(e) => onValueChange(e)} name='password' label='Enter Password' />

                            {error && <Error>{error}</Error>}

                            <LoginButton variant="contained" onClick={() => loginUser()} >Login</LoginButton>
                            <Text style={{ textAlign: 'center' }}>OR</Text>
                            <SignupButton onClick={() => toggleSignup()} style={{ marginBottom: 50 , background: "#fff", fontWeight:400, color:"#2196f3"} }  >Create an account</SignupButton>
                        </Wrapper> :
                        <Wrapper>
                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name='name' label='Enter Name' />
                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name='username' label='Enter Username' />
                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name='password' label='Enter Password' />

                            <SignupButton onClick={() => signupUser()} >Signup</SignupButton>
                            <Text style={{ textAlign: 'center' }}>OR</Text>
                            <LoginButton variant="contained" onClick={() => toggleSignup()} style={{ marginBottom: 50 , background: "#fff", fontWeight:400, color:"#2196f3"}}>Already have an account</LoginButton>
                        </Wrapper>
                }
            </Box>
        </Component>
    )
}

export default Login;