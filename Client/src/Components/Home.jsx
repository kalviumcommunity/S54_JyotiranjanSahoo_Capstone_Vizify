import React from "react";
import { Box, Button, Center, Flex, Heading, Text } from "@chakra-ui/react";

import HomeBG from "../assets/Home_bg.jpeg";

const Home = () => {
  return (
    <Box>
      <Center
        bgSize={"cover"}
        w={"100%"}
        h={"100vh"}
        bgImage={`linear-gradient(0deg, rgba(8, 24, 37, 0) 0.00%,rgba(8, 24, 37,0.2) 80.00%),linear-gradient(90deg, rgba(8, 24, 37, 0.4) 0.00%,rgba(8, 24, 37, 0) 30.00%),linear-gradient(90deg, rgba(8, 24, 37, 0) 70.00%,rgba(8, 24, 37, 0.4) 100.00%),linear-gradient(180deg, rgba(8, 24, 37, 0) 30.00%,rgb(8, 24, 37) 100.00%),url(${HomeBG})`}
      >
        <Flex direction={"column"} align={"center"}>
          <Heading
            fontFamily={"Astro Futuristic Font Regular"}
            color={"white"}
            fontSize={["5rem", "8rem"]}
            fontWeight={"100"}
            letterSpacing={"0.5vw"}
            textShadow={"0 1vw 0.5vw #10223080"}
            cursor={"default"}
          >
            VIZIFY
          </Heading>
          <Text
            textShadow={"0 0.4vw 0.3vw #10223080"}
            fontFamily={"Astro Futuristic Font Regular"}
            color={"white"}
            textAlign={"center"}
            fontSize={["0.9rem","1.5rem"]}
            cursor={"default"}
          >
            Transforming Text to Visual Brilliance
          </Text>
          <Button
            fontFamily={"Astro Futuristic Font Regular"}
            pt={['1.7vw','0.6vw']}
            bgColor={"#01EAF980"}
            mt={["5vw", "1vw"]}
            fontSize={["3.5vw", "1.4vw"]}
            color={"white"}
            w={["35vw", "12vw"]}
            h={["7vh",'7vh','6.5vh',"8vh"]}
            borderRadius={["3.5vh",'3.5vh','3.25vh','4.25vh']}
            backdropFilter={'auto'}
            backdropBlur={'2px'}
            shadow={'0 0 1vw #10223080'}
            _hover={{bgColor: '#01EAF9b3',shadow: "0 0 0.7vw #10223080",transform: "scale(1.01)",transition: "transform 0.3s"}}
          >
            Explore
          </Button>
        </Flex>
      </Center>
    </Box>
  );
};

export default Home;
