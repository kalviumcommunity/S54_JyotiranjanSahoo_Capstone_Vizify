import { useAuth0 } from "@auth0/auth0-react";
import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { context } from "./Context/AppContext";
import { useNavigate } from "react-router";
import { TbLogout2 } from "react-icons/tb";

const AccountModal = ({ isOpen, toggleShowModal }) => {
  const { user, logout } = useAuth0();
  const { loggedInUser } = useContext(context);
  const navigate = useNavigate(null);
  return (
    <Modal
      isOpen={isOpen}
      isCentered
      onOverlayClick={() => toggleShowModal(false)}
    >
      <ModalOverlay />
      <ModalContent
        backdropFilter={"auto"}
        backdropBlur={"5px"}
        bgColor={"#102230e6"}
        maxW={["90%",null,"50%","40%"]}
      >
        <ModalHeader>
          <Text className="robotoMono" color={"white"} fontSize={["2vh",null,"2vw","1.3vw"]}>
            Account Details
          </Text>
          <ModalCloseButton
            color={"white"}
            onClick={() => toggleShowModal(false)}
          />
        </ModalHeader>
        <ModalBody>
          <Flex align={"center"} gap={"2vw"} mb={"2vw"} h={"15vh"}>
            <Box borderRadius={"full"} w={["10vh",null,"10vw","8vw"]} h={["10vh",null,"10vw","8vw"]} overflow={"hidden"}>
              <Image w={["10vh",null,"10vw","8vw"]} h={["10vh",null,"10vw","8vw"]} src={user.picture} />
            </Box>
            <Flex direction={"column"} gap={"0.2vw"}>
              <Text
                color={"white"}
                className="robotoMono"
                fontWeight={"bold"}
                fontSize={["3vh",null,"2vw","1.5vw"]}
              >
                {loggedInUser.Name}
              </Text>
              <Text
                color={"white"}
                className="robotoMono"
                fontWeight={"regular"}
                fontSize={["2vh",null,"1.5vw","1.2vw"]}
                fontStyle={"italic"}
              >
                {loggedInUser.Email}
              </Text>
              <Text
                color={"white"}
                className="robotoMono"
                fontWeight={"light"}
                maxW={"fit-content"}
                fontSize={["1.5vh",null,"1.2vw","1vw"]}
                bgColor={"#00335C"}
                px={"0.5vw"}
                py={"0.1vh"}
                transform={"skew(-10deg)"}
                borderRadius={"md"}
              >
                {loggedInUser.Username}
              </Text>
            </Flex>
          </Flex>
          <Tabs variant={"soft-rounded"} colorScheme={"whiteAlpha"}>
            <TabList mb={"1vw"}>
              <Tab color={"white"} fontSize={["2vh","1.2vw"]}>Images</Tab>
              <Tab color={"white"} fontSize={["2vh","1.2vw"]}>Presentations</Tab>
            </TabList>
            <TabPanels>
              <TabPanel
                maxH={"50vh"}
                overflowY={"scroll"}
              >
                {loggedInUser.Images.slice(
                  1,
                  loggedInUser.Images.length < 4
                    ? loggedInUser.Images.length
                    : 4
                ).map((e, i) => {
                  return (
                    <Box
                      borderRadius={"lg"}
                      cursor={"pointer"}
                      _hover={{
                        filter: "drop-shadow(0 0 0.5vw #01EAF920)",
                      }}
                      w={"100%"}
                      //   h={"15vh"}
                      overflow={"hidden"}
                      pos={"relative"}
                      mb={"2vh"}
                      onClick={() => {
                        navigate("/text-to-img");
                        toggleShowModal(false);
                      }}
                    >
                      <Image src={e.images[0]} />
                      <Center
                        pos={"absolute"}
                        bottom={"0"}
                        color={"white"}
                        px={"0.5vw"}
                        py={"0.5vh"}
                        h={"fit-content"}
                        minH={"10%"}
                        w={"100%"}
                        bgImage={
                          "linear-gradient(0deg, rgba(16,34,48, 1) 0.00%,rgba(16,34,48,0) 130.00%)"
                        }
                      >
                        <Text textAlign={"center"} className="robotoMono" fontSize={["2vh",null,"1.5vw","1.1vw"]}>{e.prompt}</Text>
                      </Center>
                    </Box>
                  );
                })}
                <Center>
                  <Button
                    variant={"ghost"}
                    colorScheme="whiteAlpha"
                    color={"white"}
                    borderRadius={"full"}
                    onClick={() => {
                      navigate("/text-to-img");
                      toggleShowModal(false);
                    }}
                  >
                    View More
                  </Button>
                </Center>
              </TabPanel>
              <TabPanel maxH={"50vh"} overflowY={"scroll"}>
                {loggedInUser.Presentations.slice(
                  1,
                  loggedInUser.Presentations.length < 4
                    ? loggedInUser.Presentations.length
                    : 4
                ).map((e, i) => {
                  return (
                    <Box
                      cursor={"pointer"}
                      borderRadius={"lg"}
                      _hover={{
                        filter: "drop-shadow(0 0 0.5vw #01EAF920)",
                      }}
                      w={"100%"}
                      //   h={"15vh"}
                      overflow={"hidden"}
                      mb={"2vh"}
                      pos={"relative"}
                      onClick={() => {
                        navigate("/text-to-ppt");
                        toggleShowModal(false);
                      }}
                    >
                      <Image src={e.presentation.background.image} />
                      <Center
                        pos={"absolute"}
                        bottom={"0"}
                        color={"white"}
                        px={"0.5vw"}
                        py={"0.5vh"}
                        h={"fit-content"}
                        w={"100%"}
                        bgImage={
                          "linear-gradient(0deg, rgba(16,34,48, 1) 0.00%,rgba(16,34,48,0) 130.00%)"
                        }
                      >
                        <Text className="robotoMono" fontSize={["2vh",null,"1.5vw","1.1vw"]}>{e.title}</Text>
                      </Center>
                    </Box>
                  );
                })}
                <Center>
                  <Button
                    variant={"ghost"}
                    colorScheme="whiteAlpha"
                    color={"white"}
                    borderRadius={"full"}
                    onClick={() => {
                      navigate("/text-to-ppt");
                      toggleShowModal(false);
                    }}
                  >
                    View More
                  </Button>
                </Center>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
        <ModalFooter>
          <Center w={"100%"}>
            <Button
              variant={"ghost"}
              colorScheme="whiteAlpha"
              color={"#DA3633"}
              borderRadius={"full"}
              onClick={() => {
                logout({ logoutParams: { returnTo: window.location.origin } });
              }}
              leftIcon={<TbLogout2 />}
            >
              Log Out
            </Button>
          </Center>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AccountModal;
