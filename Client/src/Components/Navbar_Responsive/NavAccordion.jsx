import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Divider,
  Flex,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const NavAccordion = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Accordion allowToggle>
      <AccordionItem border={"none"}>
        <AccordionButton
          color={"white"}
          fontSize={"5vw"}
          fontWeight={"bold"}
          px={"0"}
        >
          <Box as={"span"}>Explore</Box>
          <AccordionIcon mt={"1vw"} mx={"2vw"} />
        </AccordionButton>
        <AccordionPanel>
              <VStack align={"start"}>
                  <Link to={"/texttoppt"}><Button variant={'link'} color={'white'} borderRadius={'none'}>Text to Presentation</Button></Link>
                  <Link to={"/texttoimg"}><Button variant={'link'} color={'white'} borderRadius={'none'}>Text to Image</Button></Link>
              </VStack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default NavAccordion;
