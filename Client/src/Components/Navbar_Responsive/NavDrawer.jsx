import {
  Button,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Img,
  VStack,
  Divider,
  Accordion,
  AccordionItem,
  AccordionButton,
} from "@chakra-ui/react";
import React, { useContext, useRef } from "react";
import { HamburgerIcon } from "@chakra-ui/icons";
import Logo from "./../../assets/Vizify_Logo.png";
import { Link } from "react-router-dom";
import NavAccordion from "./NavAccordion";
import { context } from "../Context/AppContext";

const NavDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const {footerRef} = useContext(context)

  return (
    <>
      <Button ref={btnRef} color="white" onClick={onOpen} variant={"link"}>
        <HamburgerIcon boxSize={7} />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size={"xs"}
      >
        <DrawerOverlay />
        <DrawerContent bgColor={"#102230"}>
          <DrawerCloseButton color={"white"} />
          <DrawerHeader>
            <Img src={Logo} maxH={"8vw"} />
          </DrawerHeader>
          <DrawerBody mt={"5vw"}>
            <VStack align={"start"}>
              <Button
                variant={"link"}
                fontSize={"5vw"}
                color={"white"}
                h={[null, "5vw", null, "4.4vw"]}
                _hover={{
                  filter: "drop-shadow(0 0 0.2vw #ffffff90)",
                }}
                transition={"all 0.2s"}
              >
                <Link to={"/"}>Home</Link>
              </Button>
              <NavAccordion />
              <Button
                variant={"link"}
                fontSize={"5vw"}
                color={"white"}
                h={[null, "5vw", null, "4.4vw"]}
                _hover={{
                  filter: "drop-shadow(0 0 0.2vw #ffffff90)",
                }}
                transition={"all 0.2s"}
                onClick={()=>{
                  if(footerRef.current){
                    footerRef.current.scrollIntoView({behavior: "smooth"})
                  }
                  onClose()
                }}
              >
                Contact Us
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NavDrawer;
