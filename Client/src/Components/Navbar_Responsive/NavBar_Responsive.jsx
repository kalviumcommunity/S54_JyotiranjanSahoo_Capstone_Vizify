import { Box, Center, Flex, Img } from "@chakra-ui/react";
import React from "react";
import Logo from "./../../assets/Vizify_Logo.png";
import NavDrawer from "./NavDrawer";


const NavBar_Responsive = () => {
  return (
    <Center>
      <Flex
        backdropFilter={"auto"}
        backdropBlur={"5px"}
        pos={"fixed"}
        w={"95vw"}
        h={'15vw'}
        bgColor={"#102230e6"}
        top={"3vw"}
        borderRadius={"5vh"}
        justify={'space-between'}
        align={"center"}
        px={"5vw"}
        border={"3px solid #10223060"}
        filter={"drop-shadow(0 0.5vw 0.3vw #00000040 )"}
        zIndex={"1"}
      >
        <Box w={"33%"} _hover={{
                filter: "drop-shadow(0 0 0.5vw #01EAF980)",
              }}
              transition={"all 0.2s"}>
          <Img src={Logo} maxH={"8vw"} />
        </Box>
        <NavDrawer/>
      </Flex>
    </Center>
  );
};

export default NavBar_Responsive;
