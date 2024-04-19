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
          fontWeight={"semibold"}
          px={"0"}
          variant="link"
          h={"10vw"}
          className="robotoMono"
        >
          Explore
          <AccordionIcon mt={"1vw"} mx={"2vw"} />
        </AccordionButton>
        <AccordionPanel>
              <VStack align={"start"}>
                  <Link className="robotoMono" to={"/texttoppt"}><Button variant={'link'} color={'white'} borderRadius={'none'}>Text to Presentation</Button></Link>
                  <Link className="robotoMono" to={"/texttoimg"}><Button variant={'link'} color={'white'} borderRadius={'none'}>Text to Image</Button></Link>
              </VStack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default NavAccordion;
