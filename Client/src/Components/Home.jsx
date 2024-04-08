import React, { useContext, useEffect, useLayoutEffect, useRef } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  Img,
  Text,
} from "@chakra-ui/react";

import HomeBG from "./../assets/Home_bg.jpeg";
import AIGenImg from "./../assets/AI_Section.png";
import TextToImg from "./../assets/textToImgHomeImg.png";
import TextToPPT from "./../assets/textToPPTHomeImg.png";
import "./../font.css";
import { context } from "./Context/AppContext";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";


const Home = () => {
  const exploreRef = useRef(null);
  const { user, isLoading } = useAuth0();
  const {userData, setUserData, accessToken,isSocialLogin,setIsSocialLogin} = useContext(context)
  useEffect(() => {
    if (!isLoading) {
      if (accessToken != "") {
        const options = {
          method: "GET",
          url: `https://${import.meta.env.VITE_AUTH0_DOMAIN}/api/v2/users`,
          params: { q: `email:${user.email}`, search_engine: "v3" },
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
        axios
          .request(options)
          .then((response) => {
            setUserData(response.data[0]);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  }, [user]);
  useEffect(()=>{
    if(Object.keys(userData).length != 0 ){{
      setIsSocialLogin(userData.identities[0].isSocial);
    }}
  },[userData])

  console.log(userData);

  return (
    <>
      <Box w={"100%"}>
        {/* Landing Div  */}
        <Center
          bgSize={"cover"}
          w={"100%"}
          h={"100vh"}
          bgImage={`linear-gradient(0deg, rgba(8, 24, 37, 0) 0.00%,rgba(8, 24, 37,0.2) 80.00%),linear-gradient(90deg, rgba(8, 24, 37, 0.4) 0.00%,rgba(8, 24, 37, 0) 30.00%),linear-gradient(90deg, rgba(8, 24, 37, 0) 70.00%,rgba(8, 24, 37, 0.4) 100.00%),linear-gradient(180deg, rgba(8, 24, 37, 0) 30.00%,rgb(8, 24, 37) 100.00%),url(${HomeBG})`}
        >
          <Flex direction={"column"} align={"center"}>
            <Text
              className="astro"
              color={"white"}
              fontSize={["5rem", "8rem"]}
              fontWeight={"100"}
              letterSpacing={"0.5vw"}
              textShadow={"0 1vw 0.5vw #10223080"}
              cursor={"default"}
            >
              VIZIFY
            </Text>
            <Text
              className="astro"
              textShadow={"0 0.4vw 0.3vw #10223080"}
              fontFamily={"Astro Futuristic Font Regular"}
              color={"white"}
              textAlign={"center"}
              fontSize={["0.9rem", "1.5rem"]}
              cursor={"default"}
            >
              Transforming Text to Visual Brilliance
            </Text>
            <Button
              className="astro"
              pt={["1.7vw", "0.6vw"]}
              bgColor={"#01EAF980"}
              mt={["5vw", "1vw"]}
              fontSize={["3.5vw", "1.4vw"]}
              color={"white"}
              w={["35vw", "12vw"]}
              h={["7vh", "7vh", "6.5vh", "8vh"]}
              borderRadius={["3.5vh", "3.5vh", "3.25vh", "4.25vh"]}
              backdropFilter={"auto"}
              backdropBlur={"2px"}
              shadow={"0 0 1vw #10223080"}
              _hover={{
                bgColor: "#01EAF9b3",
                shadow: "0 0 0.7vw #10223080",
                transform: "scale(1.01)",
                transition: "transform 0.3s",
              }}
              onClick={() => {
                if (exploreRef.current) {
                  const y =
                    exploreRef.current.getBoundingClientRect().top + window.pageYOffset - 100
                  window.scrollTo({ top: y, behavior: "smooth" });
                }
              }}
            >
              Explore
            </Button>
          </Flex>
        </Center>
  
        {/* AI Generation Part  */}
        <Flex
          w={"94%"}
          m={"0 auto"}
          direction={["column", "row"]}
          justify={["initial", "space-between"]}
          py={"5vw"}
        >
          <Flex direction={"column"} w={["100%", "45%"]}>
            <Text
              className="futuristic"
              fontSize={["3.5rem", null, "3.5rem", "4.5rem"]}
              textAlign={["center", "left"]}
              lineHeight={["10vw", null, "7vw", "4vw"]}
              background={
                "-webkit-linear-gradient(113deg, rgba(0,178,255,1) 7%, rgba(7,216,239,1) 80%)"
              }
              backgroundClip={"text"}
            >
              AI Based
              <br />
              Generation
            </Text>
            <Img
              src={AIGenImg}
              boxSize={["100%", "45%"]}
              objectFit={"cover"}
              my={["5vw", "0"]}
              display={["inline", "none"]}
            />
            <Text
              color={"white"}
              my={["3vw", "2vw"]}
              textAlign={["center", "left"]}
            >
              Vizify pioneers content creation by seamlessly integrating advanced
              Language Model (LLM) technology. Our platform empowers users to
              effortlessly convert text into captivating visuals and dynamic
              presentations through curated LLMs. By removing the need for users
              to develop their own AI solutions, we democratize AI-driven
              transformation, making creativity accessible to all.
              <br />
              <br />
              With carefully selected LLMs tailored to diverse content
              transformation needs, Vizify enables users to enhance presentations
              and craft engaging content with ease. We bridge the gap between
              technical complexity and user-friendly interfaces, unlocking new
              levels of expression. Our mission is to revolutionize storytelling
              in the digital age, empowering users to communicate and express
              their ideas with unparalleled creativity and impact.
            </Text>
          </Flex>
          <Img
            src={AIGenImg}
            boxSize={["100%", "45%"]}
            objectFit={"cover"}
            my={["5vw", "0"]}
            display={["none", "inline"]}
          />
        </Flex>
  
        {/* Feature Part  */}
        <Flex
          w={"94%"}
          m={"0 auto"}
          py={"5vw"}
          direction={"column"}
          align={"center"}
        >
          <Text
            className="futuristic"
            fontSize={["3.5rem", null, "3.5rem", "4.5rem"]}
            textAlign={["center", "left"]}
            lineHeight={["9vw", null, "7vw", "4vw"]}
            background={
              "-webkit-linear-gradient(113deg, rgba(0,178,255,1) 7%, rgba(7,216,239,1) 80%)"
            }
            backgroundClip={"text"}
            ref={exploreRef}
            // mb={"3vw"}
          >
            FEATURES
          </Text>
  
          {/* Text To Image Part  */}
          <Flex
            w={"100%"}
            direction={["column", "row"]}
            justify={["initial", "space-between"]}
            my={"5vw"}
          >
            <Flex w={["100%", "45%"]} direction={"column"}>
              <Text
                w={"100%"}
                className="futuristic"
                fontSize={["2rem", null, "2.5rem", "3.5rem"]}
                textAlign={["center", "left"]}
                color={"white"}
              >
                Text to Image
              </Text>
              <Img
                src={TextToImg}
                boxSize={["100%", "45%"]}
                objectFit={"cover"}
                my={["5vw", "0"]}
                display={["inline", "none"]}
              />
              <Text
                color={"white"}
                my={["3vw", "2vw"]}
                textAlign={["center", "left"]}
              >
                Experience seamless text-to-image generation with our cutting-edge
                Stable Diffusion Language Model (LLM) feature. Harnessing the
                power of AI, our platform effortlessly transforms textual content
                into captivating visuals. By leveraging Stable Diffusion LLM
                technology, users can generate high-quality images with remarkable
                fidelity and detail. Explore the endless possibilities of visual
                storytelling as you bring your ideas to life in stunning imagery,
                all with the ease and precision offered by our innovative feature.
              </Text>
              <Button
                className="astro"
                pt={["1.7vw", "0.6vw"]}
                bgColor={"#01EAF980"}
                mx={["auto", "0"]}
                fontSize={["3.5vw", "1.4vw"]}
                color={"white"}
                w={["35vw", "12vw"]}
                h={["7vh", "7vh", "6.5vh", "8vh"]}
                borderRadius={["3.5vh", "3.5vh", "3.25vh", "4.25vh"]}
                backdropFilter={"auto"}
                backdropBlur={"2px"}
                shadow={"0 0 1vw #10223080"}
                _hover={{
                  bgColor: "#01EAF9b3",
                  shadow: "0 0 0.7vw #10223080",
                  transform: "scale(1.01)",
                  transition: "transform 0.3s",
                }}
              >
                Try now
              </Button>
            </Flex>
            <Img
              src={TextToImg}
              boxSize={["100%", "45%"]}
              objectFit={"cover"}
              my={["5vw", "0"]}
              display={["none", "inline"]}
            />
          </Flex>
  
          {/* Text To Presentation Part  */}
          <Flex
            w={"100%"}
            direction={["column", "row"]}
            justify={["initial", "space-between"]}
            my={"5vw"}
          >
            <Img
              src={TextToPPT}
              boxSize={["100%", "45%"]}
              objectFit={"cover"}
              my={["5vw", "0"]}
              display={["none", "inline"]}
            />
            <Flex w={["100%", "45%"]} direction={"column"}>
              <Text
                w={"100%"}
                className="futuristic"
                fontSize={["2rem", null, "2.5rem", "3.5rem"]}
                textAlign={["center", "left"]}
                color={"white"}
              >
                Text to Presentation
              </Text>
              <Img
                src={TextToPPT}
                boxSize={["100%", "45%"]}
                objectFit={"cover"}
                my={["5vw", "0"]}
                display={["inline", "none"]}
              />
              <Text
                color={"white"}
                my={["3vw", "2vw"]}
                textAlign={["center", "left"]}
              >
                Our website features an innovative Presentation Generation tool
                that combines the power of Gemini Language Model (LLM) with
                proprietary logic to offer dynamic content creation. Seamlessly
                integrating Gemini LLM, this tool interprets user input and
                augments it with our unique algorithms, ensuring personalized and
                engaging presentations. By leveraging Gemini's capabilities
                alongside our custom logic, users experience unparalleled
                text-to-presentation generation, streamlining their content
                creation process with efficiency and creativity.
              </Text>
              <Button
                className="astro"
                pt={["1.7vw", "0.6vw"]}
                bgColor={"#01EAF980"}
                mx={["auto", "0"]}
                fontSize={["3.5vw", "1.4vw"]}
                color={"white"}
                w={["35vw", "12vw"]}
                h={["7vh", "7vh", "6.5vh", "8vh"]}
                borderRadius={["3.5vh", "3.5vh", "3.25vh", "4.25vh"]}
                backdropFilter={"auto"}
                backdropBlur={"2px"}
                shadow={"0 0 1vw #10223080"}
                _hover={{
                  bgColor: "#01EAF9b3",
                  shadow: "0 0 0.7vw #10223080",
                  transform: "scale(1.01)",
                  transition: "transform 0.3s",
                }}
              >
                Try now
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default Home;
