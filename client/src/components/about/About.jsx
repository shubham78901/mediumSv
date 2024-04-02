import { Box, styled, Typography, Link } from "@mui/material";
import { GitHub, Instagram, Email } from '@mui/icons-material';
import featured from "../../assert/featured.jpg";
import mem from "../../assert/mem.png";

const Banner = styled("img")`
  width: 100%;
  height: 50vh;
  background-position: left 0px bottom 0px;
  background-size: cover;
  opacity: 0.8;
`;

const Wrapper = styled(Box)`
  display: flex;
  gap: 20px;

  padding: 20px 80px 40px 80px;
  & > h3,
  & > h5 {
    margin-top: 50px;
  }
`;

const Heading = styled(Box)`
  display: flex;
  position: absolute;
  top: 28%;
  left: 40%;
  font-size: 3.5rem;
  color: white;
  font-weight: 700;
`;

const Subheading = styled(Box)`
  display: flex;
  font-size: 40px;
  color: Black;
  font-weight: 700;
`;

const Teamwrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 20px 80px 40px 80px;
`;
const Team = styled(Box)`
  display: flex;
  padding: 20px;
  gap: 20px;
`;
const Member = styled(Box)`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 400px;
  border: 1px solid #e2e2e2;
  padding: 5px 8px;
  border-radius: 7px;
  &:hover {
    box-shadow: 5px 5px 15px 10px rgba(0, 0, 0, 0.1);
  }
`;
const Pic = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #e2e2e2;
`;
const Img = styled("img")`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 1px solid #e2e2e2;
`;

const Aboutmem = styled(Box)`
  display: flex;
  flex-direction: column;
  text-align: justify;
  padding: 10px 15px;
`;
const Memname = styled(Box)`
  display: flex;
  padding-bottom: 10px;
  font-size: 1.5rem;
  color: #800000;
`;

const Text = styled(Typography,Box)`
  color: #878787;
  font-size: 1.4rem;
  &:hover {
    box-shadow: 5px 5px 15px 10px rgba(0, 0, 0, 0.1);
  }
`;


const About = () => {

    return (
        <Box>
            <Banner/>
            <Wrapper>
                <Typography variant="h3">Code for Interview</Typography>
                <Text variant="h5">I'm a Software Engineer based in India. 
                    I've built websites, desktop applications and corporate software.<br />
                    If you are interested, you can view some of my favorite projects here
                    <Box component="span" style={{ marginLeft: 5 }}>
                        <Link href="https://github.com/kunaltyagi9" color="inherit" target="_blank"><GitHub /></Link>
                    </Box>
                </Text>
                <Text variant="h5">
                    Need something built or simply want to have chat? Reach out to me on
                    <Box component="span" style={{ marginLeft: 5 }}>
                        <Link href="https://www.instagram.com/codeforinterview/" color="inherit" target="_blank">
                            <Instagram />
                        </Link>
                    </Box>  
                        or send me an Email 
                        <Link href="mailto:codeforinterview@gmail.com?Subject=This is a subject" target="_blank" color="inherit">
                            <Email />
                        </Link>. */}
        </Text>
      </Wrapper>

      <Teamwrapper>
        <Subheading
          style={{
            display: "flex",
            width: "fit-content",
            margin: "5px 0px 20px 0px",
            borderBottom: "2px solid red",
          }}
        >
          Our Team
        </Subheading>
        <Team>
          <Member>
            <Pic>
              <Img src={mem} />
            </Pic>
            <Aboutmem>
              <Memname>Ram ji</Memname>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere
              nihil quaerat vitae in adipisci sunt neque omnis eveniet veritatis
              unde nesciunt, necessitatibus provident animi aliquid vero
              ratione? Asperiores cupiditate explicabo hic ut, recusandae eaque
              at laborum similique ab, laudantium repellat.
            </Aboutmem>
          </Member>
          <Member>
            <Pic>
              <Img src={mem} />
            </Pic>
            <Aboutmem>
              <Memname>Ram ji</Memname>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere
              nihil quaerat vitae in adipisci sunt neque omnis eveniet veritatis
              unde nesciunt, necessitatibus provident animi aliquid vero
              ratione? Asperiores cupiditate explicabo hic ut, recusandae eaque
              at laborum similique ab, laudantium repellat.
            </Aboutmem>
          </Member>
          <Member>
            <Pic>
              <Img src={mem} />
            </Pic>
            <Aboutmem>
              <Memname>Ram ji</Memname>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere
              nihil quaerat vitae in adipisci sunt neque omnis eveniet veritatis
              unde nesciunt, necessitatibus provident animi aliquid vero
              ratione? Asperiores cupiditate explicabo hic ut, recusandae eaque
              at laborum similique ab, laudantium repellat.
            </Aboutmem>
          </Member>
          <Member>
            <Pic>
              <Img src={mem} />
            </Pic>
            <Aboutmem>
              <Memname>Ram ji</Memname>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere
              nihil quaerat vitae in adipisci sunt neque omnis eveniet veritatis
              unde nesciunt, necessitatibus provident animi aliquid vero
              ratione? Asperiores cupiditate explicabo hic ut, recusandae eaque
              at laborum similique ab, laudantium repellat.
            </Aboutmem>
          </Member>
        </Team>
      </Teamwrapper>
    </Box>
  );
};

export default About;
