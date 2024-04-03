import { Box, styled, Typography, Link } from "@mui/material";
// import { GitHub, Instagram, Email } from '@mui/icons-material';
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
  ${'' /* padding-bottom:2px; */}
  border-bottom: 2px solid rgb(10 148 205);
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
      <Banner src={featured} />
      <Heading variant="h3">Who we are?</Heading>
      <Wrapper>
        <Text
          variant="h5"
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            border: "1px solid #e2e2e2",
            padding: "5px 15px ",
            textAlign: "justify",
            borderRadius: "7px",
            paddingBottom: "20px",
          }}

        >
          <Subheading
            style={{
              display: "flex",
              width: "fit-content",
              margin: "5px 0px 20px 0px",
              borderBottom: "2px solid rgb(10 148 205)",
            }}
          >
            We are Coder
          </Subheading>
          Embark on a journey where your words, thoughts, and creativity not only find a platform but also earn you crypto rewards! Medium SV isn't just another content-sharing platform; it's a bustling hub where your articles, blogs, podcasts, and even memes can thrive while you reap the rewards in cryptocurrency. Join the revolution where creativity meets crypto, and let your content speak for itself while your wallet grows. Discover the power of Medium SV today!.
        </Text>
        <Text
          variant="h5"
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            border: "1px solid #e2e2e2",
            padding: "5px 15px ",
            textAlign: "justify",
            borderRadius: "7px",
            paddingBottom: "20px",
          }}
        >
          <Subheading
            style={{
              display: "flex",
              width: "fit-content",
              margin: "5px 0px 20px 0px",
              borderBottom: "2px solid rgb(10 148 205)",
            }}
          >
            Owr motive
          </Subheading>
          Need something built or simply want to have chat? Reach out to me on
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis
          molestiae ex possimus! Alias architecto eveniet laudantium corrupti
          obcaecati deserunt, aliquid officia. Rem tenetur sapiente quos eveniet
          excepturi sit quibusdam libero deserunt suscipit aspernatur magnam
          laborum quae quam, architecto, totam quia necessitatibus sint iusto
          fuga! Iure soluta nostrum temporibus repellendus voluptatibus ad
          maiores necessitatibus iste. Facilis rerum officiis excepturi neque
          animi cumque. Optio quasi at, debitis eveniet eum tempore eaque ipsam
          inventore atque tempora iure. Id similique quas maxime autem, ad
          perferendis itaque qui doloremque tempore unde doloribus laboriosam
          expedita consectetur eius ratione sequi dolorum aperiam accusamus
          dolores fuga quidem hic.
          {/* <Box component="span" style={{ marginLeft: 5 }}>
                        <Link href="https://www.instagram.com/codeforinterview/" color="inherit" target="_blank">
                            <Instagram />
                        </Link>
                    </Box>   */}
          {/* or send me an Email 
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
            borderBottom: "2px solid rgb(10 148 205)",
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
