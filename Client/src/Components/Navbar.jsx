import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Img,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDownIcon } from "@chakra-ui/icons";
import React, { useContext } from "react";
import Logo from "./../assets/Vizify_Logo.png";
import { context } from "./Context/AppContext";
import LoginButton from "./LoginButton";
import { useAuth0 } from "@auth0/auth0-react";
import ProfileMenu from "./ProfileMenu";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate(null);
  const { footerRef, loginDone, loginSuccessful } = useContext(context);
  const { isAuthenticated } = useAuth0();
  return (
    <Center>
      <Flex
        backdropFilter={"auto"}
        backdropBlur={"5px"}
        pos={"fixed"}
        w={"95vw"}
        h={[null, "5vw", null, "4.4vw"]}
        bgColor={"#102230e6"}
        top={"1vw"}
        borderRadius={"5vh"}
        align={"center"}
        px={"3vw"}
        border={"3px solid #10223060"}
        filter={"drop-shadow(0 0.5vw 0.3vw #00000040 )"}
        zIndex={"1"}
      >
        <Box
          w={"33%"}
          _hover={{
            filter: "drop-shadow(0 0 0.5vw #01EAF980)",
          }}
          transition={"all 0.2s"}
        >
          <Img src={Logo} maxH={"3vw"} />
        </Box>
        <Flex w={"33%"} justify={"space-between"}>
          <Button
            variant={"link"}
            fontSize={"1.3vw"}
            color={"white"}
            h={[null, "5vw", null, "4.4vw"]}
            _hover={{
              filter: "drop-shadow(0 0 0.2vw #ffffff90)",
            }}
            transition={"all 0.2s"}
          >
            <Link className="robotoMono" to={"/"}>
              Home
            </Link>
          </Button>
          <Center>
            <Divider orientation="vertical" opacity={"0.1"} h={"2.2vw"} />
          </Center>
          <Menu isOpen={isOpen}>
            <MenuButton
              variant={"link"}
              fontSize={"1.3vw"}
              h={[null, "5vw", null, "4.4vw"]}
              color={"white"}
              _expanded={{ color: "#ffffffe6" }}
              as={Button}
              _focus={{ boxShadow: "none" }}
              onClick={isOpen ? onClose : onOpen}
              onMouseEnter={onOpen}
              onMouseLeave={onClose}
              _hover={{
                filter: "drop-shadow(0 0 0.2vw #ffffff90)",
              }}
              transition={"all 0.2s"}
              className="robotoMono"
            >
              Explore{" "}
              <ChevronDownIcon
                boxSize={[null, 3, 4, 5, 6, 7]}
                transform={`rotate(${isOpen ? "180deg" : "360deg"})`}
                transition={"all 0.3s"}
              />
            </MenuButton>
            <MenuList
              my={[null, "-1vw", null, "-0.62vw"]}
              onMouseEnter={onOpen}
              onMouseLeave={onClose}
              bgColor={"#102230e6"}
              border={"none"}
              p={"0.5vw"}
            >
              <MenuItem
                bgColor={"#10223000"}
                borderRadius={"0.3vw"}
                _hover={{
                  backgroundColor: "#ffffff10",
                  transition: "all 0.5s",
                }}
                fontSize={[null, "1.3vw", null, "1vw"]}
                color={"white"}
                onClick={() => {
                  navigate("/texttoppt");
                }}
                className="robotoMono"
              >
                Text To Presentation
              </MenuItem>
              <MenuItem
                bgColor={"#10223000"}
                borderRadius={"0.3vw"}
                _hover={{
                  backgroundColor: "#ffffff10",
                  transition: "all 0.5s",
                }}
                fontSize={[null, "1.3vw", null, "1vw"]}
                color={"white"}
                onClick={() => {
                  navigate("/texttoimg");
                }}
                className="robotoMono"
              >
                Text To Image
              </MenuItem>
            </MenuList>
          </Menu>
          <Center>
            <Divider orientation="vertical" opacity={"0.1"} h={"2.2vw"} />
          </Center>
          <Button
            variant={"link"}
            fontSize={"1.3vw"}
            color={"white"}
            h={[null, "5vw", null, "4.4vw"]}
            _hover={{
              filter: "drop-shadow(0 0 0.2vw #ffffff90)",
            }}
            transition={"all 0.2s"}
            onClick={() => {
              if (footerRef.current) {
                const y =
                  footerRef.current.getBoundingClientRect().top +
                  window.pageYOffset -
                  100;
                window.scrollTo({ top: y, behavior: "smooth" });
              }
            }}
            className="robotoMono"
          >
            Contact Us
          </Button>
        </Flex>
        {!loginDone && isAuthenticated ? (
          <Flex w={"33%"} justify="end">
            <Spinner color="white" />
          </Flex>
        ) : (
          <Flex w={"33%"} justify={"end"}>
            {loginSuccessful ? <ProfileMenu /> : <LoginButton />}
          </Flex>
        )}
      </Flex>
    </Center>
  );
};

export default Navbar;
