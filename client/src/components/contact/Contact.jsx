import {
  Box,
  styled,
  Typography,
  Link,
  TextField,
  Button,
} from "@mui/material";
import { GitHub, Instagram, Email } from "@mui/icons-material";
import About from "../about/About";
import { useState } from "react";

const Banner = styled(Box)`
  background-image: url(https://images.pexels.com/photos/207456/pexels-photo-207456.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1);
  width: 100%;
  height: 50vh;
  background-position: left 0px top -100px;
  background-size: cover;
  opacity: 0.7;
`;
const Heading = styled(Box)`
  display: flex;
  width: fit-content;
  position: relative;
  margin-top: -230px;
  margin-bottom: 150px;
  left: 40%;
  font-size: 3.5rem;
  color: black;
  font-weight: 700;
  justify-content: center;
  align-items: center;
  padding-bottom: 2px;
  border-bottom: 2px solid rgb(10 148 205);
  border-radius:7px;
`;

const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  margin: 0 80px;
  & > h3,
  & > h4,
  & > h5 {
    margin-top: 30px;
  }
`;

const Text = styled(Typography)`
  color: #878787;
`;

const StyledButton = styled(Button)`
    width: fit-content;
    margin:20px auto;
    background: linear-gradient(to right, rgb(79, 232, 214) , rgb(98, 172, 236));
    color: #000;
    text-decoration: none;
    font-weight:600;
    padding: 5px 20px;
    border-radius:7px;
    &:hover{
        background: linear-gradient(to right, rgb(98, 172, 236), rgb(79, 232, 214) );
        color:white;
    }
`;

const inttialContactFieldValue = [
  {
    name: "name",
    label: "Full Name",
    id: "my-name",
  },
  {
    name: "email",
    label: "Email",
    id: "my-email",
  },
  {
    name: "message",
    label: "Message",
    id: "my-message",
    multiline: true,
    rows: 5,
  },
];

// const formInputValue = {
//     name:"name",
//     email:"email",
//     message:"message"
// }

const Contact = () => {
  const [values, setValues] = useState(inttialContactFieldValue);
  // const [errors, setErrors] = useState({});

  const handleInputValue = (e) => {
    // const {name, value} = e.target;
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    localStorage.setItem("contactNameValue", values.name);
    localStorage.setItem("contactEmailValue", values.email);
    localStorage.setItem("contactMessageValue", values.message);

    // // // // retriving data from localStorage
    // let name=localStorage.getItem("contactNameValue")
    // let email=localStorage.getItem("contactEmailValue")
    // let message=localStorage.getItem("contactMessageValue")
    // console.log(name)
    // console.log(email)
    // console.log(message)
  };

  // const validate = (values)={

  //     if (values.name){
  //         errors.name
  //     }
  // }
  return (
    <Box>
      <About />
      <Banner />
      <Heading
      // style={{
      //     borderBottom: "1px solid linear-gradient(to right, rgba(79, 232, 214) , rgba(98, 172, 236))",
      // }}
      >
        Contact US
      </Heading>
      <Wrapper>
        <Typography variant="h3"
        style={{
            paddingBottom:"5px",
            borderBottom: "2px solid rgb(10 148 205)",
            borderRadius:"7px",
        }}
        >Getting in touch is easy!</Typography>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: "18px",
            marginTop:"25px",
          }}
        >
          {inttialContactFieldValue.map((inputFieldValue, index) => {
            return (
              <TextField
                key={index}
                onBlur={handleInputValue}
                onChange={handleInputValue}
                name={inputFieldValue.name}
                label={inputFieldValue.label}
                multiline={inputFieldValue.multiline ?? false}
                rows={inputFieldValue.rows ?? 1}
                autoComplete="none"
                required
                // {...(errors[inputFieldValue.name] && {error:true, helperText:errors[inputFieldValue.name]})}

                style={{
                  display: "flex",
                  borderRadius: "7px",
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& .MuiOutlinedInput-notchedOutline": {
                    },
                    "&.Mui-focused": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "1px solid aqua",
                      },
                    },
                    ":active": {
                      borderColor: "aqua",
                    },

                    "&:hover:not(.Mui-focused)": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "aqua",
                      },
                    },
                  },
                }}
              />
            );
          })}
          
          <StyledButton type="submit" variant="button">Send Message</StyledButton>
        </form>
        <Text variant="h4">
          or
        </Text>
        <Text variant="h5">
          Reach out to me on
          <Link
            href="www.linkedin.com/in/shubham-g-01b41a192"
            color="inherit"
            target="_blank"
          >
            <Instagram />
          </Link>
          or send me an Email
          <Link href="ss363757@gmail.com" target="_blank" color="inherit">
            <Email />
          </Link>
        </Text>
      </Wrapper>
    </Box>
  );
};

export default Contact;
