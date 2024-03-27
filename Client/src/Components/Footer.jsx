import { Box, Center, Flex, Grid, GridItem, Img, Link, Text, VStack } from "@chakra-ui/react";
import { useContext } from "react";
import { context } from "./Context/AppContext";
import Logo from "./../assets/Vizify_Logo.png";
import LinkedInIcon from "./../assets/LinkedIn_icon.png"
import InstagramIcon from "./../assets/Instagram_icon.png"
import GithubIcon from "./../assets/Github_icon.png"

const Footer = () => {
  const { footerRef } = useContext(context);
  return (
    <Center ref={footerRef} py={"3vw"}>
      <Flex
        backdropFilter={"auto"}
        backdropBlur={"5px"}
        bgColor={"#102230e6"}
        borderRadius={"5vh"}
        w={"95vw"}
        p={["5vw", "3vw"]}
        direction={["column","row"]}
        justify={"space-between"}
        align={"center"}
        border={"3px solid #10223060"}
        filter={"drop-shadow(0 0.5vw 0.3vw #00000040 )"}
      >
        <Flex w={['100%','30%']} justify={"center"} h={["40vw","5vw"]} direction={"column"} align={"center"} mb={["5vw","0"]}>
            <Img src={Logo} maxH={["10vw","5vw"]}/>
            <Text color={"white"} fontSize={["1.1rem",null,"0.9rem","1.1rem"]} my={["3vw","1vw"]}>Made by S P Jyotiranjan Sahoo</Text>
            <Flex w={"30%"} justify={"space-between"}>
                <Link href="https://www.linkedin.com/in/sp-jyotiranjan-sahoo-030740289" isExternal><Img src={LinkedInIcon} maxW={["5vw",null,"1.8vw","1.5vw"]}/></Link>
                <Link href="https://github.com/spjyotiranjan" isExternal><Img src={GithubIcon} maxW={["5vw",null,"1.8vw","1.5vw"]}/></Link>
                <Link href="https://www.instagram.com/spjyotiranjan" isExternal><Img src={InstagramIcon} maxW={["5vw",null,"1.8vw","1.5vw"]}/></Link>
            </Flex>
        </Flex>
        <Grid w={['100%','65%']} gap={10} templateColumns={["1fr","1fr 1fr"]}>
            <GridItem>
                <Text color={'white'} className="futuristic" textAlign={["center", "left"]} fontSize={["1.6rem", null, "1.3rem", "2.2rem"]} mb={"1vw"}>About</Text>
                <VStack color={"white"} align={["center","start"]} w={["auto",'fit-content']}>
                    <Text cursor={"pointer"} _hover={{textDecoration: "underline"}}>FAQs</Text>
                    <Text cursor={"pointer"} _hover={{textDecoration: "underline"}}>Contact Us</Text>
                </VStack>
            </GridItem>
            <GridItem>
                <Text color={'white'} className="futuristic" textAlign={["center", "left"]} fontSize={["1.6rem", null, "1.5rem", "2.2rem"]} mb={"1vw"}>Features</Text>
                <VStack color={"white"} align={["center","start"]} w={["auto",'fit-content']}>
                    <Text cursor={"pointer"} _hover={{textDecoration: "underline"}}>Text To Presentation</Text>
                    <Text cursor={"pointer"} _hover={{textDecoration: "underline"}}>Text to Image</Text>
                </VStack>
            </GridItem>
            <GridItem colSpan={[1,2]}>
                <Text color={'white'} className="futuristic" textAlign={["center", "left"]} fontSize={["1.6rem", null, "1.5rem", "2.2rem"]} mb={"1vw"}>Technologies Used</Text>
                <VStack color={"white"} align={["center","start"]} w={["auto",'fit-content']}>
                    <Text cursor={"pointer"} _hover={{textDecoration: "underline"}}>MERN Stack</Text>
                    <Text cursor={"pointer"} _hover={{textDecoration: "underline"}}>LangChain JS</Text>
                    <Text cursor={"pointer"} _hover={{textDecoration: "underline"}}>Fabric JS</Text>
                    <Text cursor={"pointer"} _hover={{textDecoration: "underline"}}>Gemini</Text>
                    <Text cursor={"pointer"} _hover={{textDecoration: "underline"}}>PPTxGEN JS</Text>
                    <Text cursor={"pointer"} _hover={{textDecoration: "underline"}}>Stable Diffusion</Text>
                </VStack>
            </GridItem>
        </Grid>
      </Flex>
    </Center>
  );
};

export default Footer;
