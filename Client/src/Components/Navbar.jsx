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
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { CgProfile } from "react-icons/cg";
import { TbLogin2 } from "react-icons/tb";
import React, { useContext } from "react";
import Logo from "./../assets/Vizify_Logo.png";
import { context } from "./Context/AppContext";
import LoginButton from "./LoginButton";
import { useAuth0 } from "@auth0/auth0-react";
import ProfileMenu from "./ProfileMenu";


const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate(null);
  const { footerRef } = useContext(context);
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
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
            <Link to={"/"}>Home</Link>
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
            >
              Explore{" "}
              {isOpen ? (
                <ChevronUpIcon boxSize={[null, 3, 4, 5, 6, 7]} />
              ) : (
                <ChevronDownIcon boxSize={[null, 3, 4, 5, 6, 7]} />
              )}
            </MenuButton>
            <MenuList
              m={"-0.51vw"}
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
          >
            Contact Us
          </Button>
        </Flex>
        {isLoading ? <Flex w={"33%"} justify="end"><Spinner color="white"/></Flex> :<Flex w={"33%"} justify={"end"}>
          {isAuthenticated ? (
            <ProfileMenu/>
          ) : (
            <LoginButton/>
          )}
        </Flex>}
      </Flex>
    </Center>
  );
};

export default Navbar;
