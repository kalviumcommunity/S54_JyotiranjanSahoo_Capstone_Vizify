import {
  Button,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  Spinner,
  Icon,
  Flex,
  Skeleton,
  Box,
  Center,
  Text,
} from "@chakra-ui/react";
import React, { useContext, useRef } from "react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import NavAccordion from "./NavAccordion";
import { context } from "../Context/AppContext";
import { useAuth0 } from "@auth0/auth0-react";
import { TbLogin2, TbLogout2 } from "react-icons/tb";
import { deleteCookie } from "../ManageCookies";

const NavDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const {
    footerRef,
    loginSuccessfull,
    loginDone,
    setLoginDone,
    setLoggedInUser,
    loggedInUser,
    setLoginSuccessfull,
    loginSuccessful
  } = useContext(context);
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

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
        <DrawerContent
          bgColor={"#102230"}
          bgImage={
            "linear-gradient(180deg, rgba(0,178,255,0.25) 10%, rgba(0, 178, 255, 0) 80%)"
          }
        >
          <DrawerCloseButton color={"white"} />
          <DrawerHeader p={"0"}>
            <Flex
              w={"100%"}
              h={"30vh"}
              justify={"center"}
              align={"center"}
              direction={"column"}
            >
              {!loginDone ? (
                <>
                  <Flex
                    justify={"center"}
                    align={"center"}
                    direction={"column"}
                  >
                    <Skeleton borderRadius={"full"}>
                      <Box w={"10vh"} h={"10vh"} borderRadius={"full"}></Box>
                    </Skeleton>
                    <Skeleton borderRadius={"lg"} my={"1vh"}>
                      <Text fontSize={"5vw"} className="robotoMono">
                        Skeleton for Name
                      </Text>
                    </Skeleton>
                    <Skeleton borderRadius={"lg"} h={"2vh"}>
                      <Text fontSize={"3.5vw"} className="robotoMono">
                        Skeleton for Email
                      </Text>
                    </Skeleton>
                  </Flex>
                </>
              ) : loginSuccessfull ? (
                <Flex justify={"center"} align={"center"} direction={"column"}>
                  <Box
                    w={"10vh"}
                    h={"10vh"}
                    borderRadius={"full"}
                    bgImage={`url(${user.picture})`}
                    bgSize={"contain"}
                  >
                  </Box>
                  {loggedInUser.Name ? (
                    <Text
                      color={"white"}
                      fontSize={"4vw"}
                      my={"1vh"}
                      className="robotoMono"
                    >
                      {loggedInUser.Name}
                    </Text>
                  ) : (
                    <Skeleton borderRadius={"lg"} my={"1vh"}>
                      <Text fontSize={"4vw"} className="robotoMono">
                        Skeleton for Name
                      </Text>
                    </Skeleton>
                  )}
                  {loggedInUser.Email ? (
                    <Text
                      color={"white"}
                      fontSize={"2.5vw"}
                      fontWeight={"light"}
                      opacity={"0.7"}
                      fontStyle={"italic"}
                      className="robotoMono"
                    >
                      {loggedInUser.Email}
                    </Text>
                  ) : (
                    <Skeleton borderRadius={"lg"} h={"2vh"}>
                      <Text fontSize={"3.5vw"}>Skeleton for Email</Text>
                    </Skeleton>
                  )}
                </Flex>
              ) : (
                <Flex justify={"center"} align={"center"} direction={"column"}>
                  <Center
                    w={"15vh"}
                    h={"15vh"}
                    borderRadius={"full"}
                    bgColor={"white"}
                    fontSize={"2.5vw"}
                    className="robotoMono"
                  >
                    No Data
                  </Center>
                  <Text
                    my={"1vh"}
                    fontSize={"3.5vw"}
                    color={"white"}
                    className="robotoMono"
                  >
                    Login
                  </Text>
                </Flex>
              )}
            </Flex>
          </DrawerHeader>
          <DrawerBody mt={"5vw"}>
            <VStack align={"start"}>
              <Button
                variant={"link"}
                fontSize={"5vw"}
                color={"white"}
                h={"10vw"}
                _hover={{
                  filter: "drop-shadow(0 0 0.2vw #ffffff90)",
                }}
                transition={"all 0.2s"}
              >
                <Link className="robotoMono" to={"/"}>
                  Home
                </Link>
              </Button>
              <NavAccordion />
              <Button
                variant={"link"}
                fontSize={"5vw"}
                color={"white"}
                h={"10vw"}
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
                    window.scrollTo({ top: y, behavior: "lgooth" });
                  }
                  onClose();
                }}
                className="robotoMono"
              >
                Contact Us
              </Button>
              {!loginDone ? (
                <Spinner color="white" />
              ) : loginSuccessfull ? (
                <Button
                  variant={"link"}
                  fontSize={"5vw"}
                  color={"#DA3633"}
                  h={"10vw"}
                  leftIcon={<Icon as={TbLogout2} boxSize={6} mr={"1vw"} />}
                  className="robotoMono"
                  onClick={() => {
                    logout({
                      logoutParams: { returnTo: window.location.origin },
                    });
                    deleteCookie("access_token");
                    setLoggedInUser({});
                    setLoginSuccessfull(false)
                    setLoginDone(false);
                  }}
                >
                  Logout
                </Button>
              ) : (
                <Button
                  variant={"link"}
                  fontSize={"5vw"}
                  color={"white"}
                  h={"10vw"}
                  leftIcon={<Icon as={TbLogin2} boxSize={7} color={"white"} />}
                  className="robotoMono"
                  onClick={() => loginWithRedirect()}
                >
                  Login
                </Button>
              )}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NavDrawer;
