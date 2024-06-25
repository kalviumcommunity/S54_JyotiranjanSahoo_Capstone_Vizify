import { useAuth0 } from "@auth0/auth0-react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  VStack,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { context } from "../Context/AppContext";

const NavAccordion = ({onClose}) => {
  const { loginWithRedirect } = useAuth0();
  const { loginSuccessfull } = useContext(context);
  const navigate = useNavigate(null)
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
            <Button
              variant={"link"}
              onClick={() => {
                if (loginSuccessfull) {
                  navigate("/text-to-ppt");
                } else {
                  loginWithRedirect();
                }
                onClose()
              }}
              className="robotoMono"
              color={"white"}
              borderRadius={"none"}
            >
              Text to Presentation
            </Button>
            <Button
              variant={"link"}
              onClick={() => {
                if (loginSuccessfull) {
                  navigate("/text-to-img");
                } else {
                  loginWithRedirect();
                }
                onClose()
              }}
              className="robotoMono"
              color={"white"}
              borderRadius={"none"}
            >
              Text to Image
            </Button>
          </VStack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default NavAccordion;
