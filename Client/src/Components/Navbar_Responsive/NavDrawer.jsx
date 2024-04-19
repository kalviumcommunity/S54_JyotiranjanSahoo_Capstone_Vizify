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
  Spinner,
  Icon,
  Flex,
  Image,
  Skeleton,
  Box,
  Center,
  Text,
} from "@chakra-ui/react";
import React, { useContext, useRef } from "react";
import { HamburgerIcon } from "@chakra-ui/icons";
import Logo from "./../../assets/Vizify_Logo.png";
import { Link } from "react-router-dom";
import NavAccordion from "./NavAccordion";
import { context } from "../Context/AppContext";
import { useAuth0 } from "@auth0/auth0-react";
import { TbLogin2, TbLogout2 } from "react-icons/tb";
import { deleteCookie } from "../ManageCookies";

const NavDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const { footerRef, loginSuccessful, loginDone, loggedInUser, setUserData,setLoginDone,setLoggedInUser,setAllUsers,setUserId } =
    useContext(context);
  const { user, isAuthenticated, loginWithRedirect,logout } = useAuth0();
  console.log(loggedInUser);
  // console.log(userData);
  // console.log(user);

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
          <DrawerHeader p={"0"}>
            {/* <Img src={Logo} maxH={"8vw"} /> */}
            <Flex
              w={"100%"}
              h={"30vh"}
              bgImage={
                // "linear-gradient(180deg, rgba(255,255,255,0.4) 10%, rgba(255, 255, 255, 0) 100%)"
                // "linear-gradient(180deg, rgba(0,178,255,0.4) 10%, rgba(16, 34, 48, 1) 100%)"
                "linear-gradient(180deg, rgba(0,178,255,0.25) 10%, rgba(0, 178, 255, 0) 100%)"
              }
              // filter={"drop-shadow(0 0 1vw #ffffff80)"}
              // bgColor={"#ffffff33"}
              // borderRadius={"lg"}
              justify={"center"}
              align={"center"}
              direction={"column"}
            >
              {/* <Image src={user.picture} alt="" /> */}
              {!loginDone && isAuthenticated ? (
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
                      <Text fontSize={"5vw"} className="robotoMono">Skeleton for Name</Text>
                    </Skeleton>
                    <Skeleton borderRadius={"lg"} h={"2vh"}>
                      <Text fontSize={"3.5vw"} className="robotoMono">Skeleton for Email</Text>
                    </Skeleton>
                  </Flex>
                </>
              ) : loginSuccessful ? (
                <Flex justify={"center"} align={"center"} direction={"column"}>
                  <Box
                    w={"10vh"}
                    h={"10vh"}
                    borderRadius={"full"}
                    bgImage={`url(${user.picture})`}
                    bgSize={"contain"}
                  >
                    {/* <Image src={user.picture} /> */}
                  </Box>
                  {loggedInUser.Name ? (
                    <Text color={"white"} fontSize={"4vw"} my={"1vh"} className="robotoMono">
                      {loggedInUser.Name}
                    </Text>
                  ) : (
                    <Skeleton borderRadius={"lg"} my={"1vh"}>
                      <Text fontSize={"4vw"} className="robotoMono">Skeleton for Name</Text>
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
                  <Text my={"1vh"} fontSize={"3.5vw"} color={"white"} className="robotoMono">Login</Text>
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
                <Link className="robotoMono" to={"/"}>Home</Link>
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
              {!loginDone && isAuthenticated ? (
                <Spinner color="white" />
              ) : loginSuccessful ? (
                <Button
                  variant={"link"}
                  fontSize={"5vw"}
                  color={"white"}
                  h={"10vw"}
                  leftIcon={<Icon as={TbLogout2} boxSize={6} mr={"1vw"} />}
                  className="robotoMono"
                  onClick={() => {
                    logout({ logoutParams: { returnTo: window.location.origin } });
                    deleteCookie("username");
                    setUserData({});
                    setLoggedInUser({});
                    setLoginDone(false);
                    setUserId("");
                    setAllUsers([]);
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
                  onClick={()=>loginWithRedirect()}
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
