import {
  Box,
  Center,
  Flex,
  Input,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  Button,
  useDisclosure,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
} from "@chakra-ui/react";
import TextToPPTBG from "./../assets/Text_to_ppt_bg.png";
import { useContext, useLayoutEffect, useState } from "react";
import { context } from "./Context/AppContext";
import downloadPPT from "./downloadPPT";
import axios from "axios";
import { useNavigate } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";

const TextToPPT = () => {
  const { setFooterDisplay, loggedInUser, loginSuccessfull, loginDone } =
    useContext(context);
  const { isAuthenticated } = useAuth0();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [generatedPPT, setGeneratedPPT] = useState({});
  const [generatedPPTTitle, setGeneratedPPTTitle] = useState("");
  const [isGenerated, setIsGenerated] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(null);
  const [pptDetails, setPPTDetails] = useState({
    description: "",
    no_of_slides: 5,
    style: "Corporate",
    color_tone: "Warm",
    color_scheme: "",
  });
  const historyPPT = loggedInUser.Presentations;
  console.log(generatedPPT);
  console.log(generatedPPTTitle);

  const pptParameters = {
    style: [
      "Corporate",
      "Funky",
      "Anime",
      "Futuristic",
      "Cartoon",
      "Modern",
      "Retro",
    ],
    color_tone: ["warm", "cool"],
  };
  const generatePresentation = (pptDetails, username) => {
    onOpen();
    setError(null);
    const postOption = { ...pptDetails, username };
    axios
      .post(import.meta.env.VITE_VZIFIY_BACKEND_PRESENTATION, postOption)
      .then((res) => {
        setGeneratedPPT(res.data.createdPPT.presentation);
        setGeneratedPPTTitle(res.data.createdPPT.title);
        setIsGenerated(true);
      })
      .catch((err) => {
        if (err) {
          console.log(err.response?.data.error);
          setError(err.response?.data.error);
        }
      });
  };
  useLayoutEffect(() => {
    setFooterDisplay(false);

    return () => {
      setFooterDisplay(true);
    };
  }, []);
  useLayoutEffect(() => {
    if (isAuthenticated) {
      if (loginDone && !loginSuccessfull) {
        navigate("/");
      }
    }
  }, [isAuthenticated, loginDone, loginSuccessfull]);

  return (
    <Flex direction={"column"}>
      <Modal isOpen={isOpen} isCentered closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent
          py={"2vw"}
          backdropFilter={"auto"}
          backdropBlur={"5px"}
          borderRadius={["lg  ", "2xl"]}
          w={["90%", null, "55%", "60%"]}
          h={["40%"]}
          bgColor={!isGenerated && "#102230f7"}
          bgImage={
            isGenerated &&
            `linear-gradient(0deg, rgba(8, 24, 37, 0.5) 0.00%,rgba(8, 24, 37,0) 40.00%),linear-gradient(180deg, rgba(8, 24, 37, 0.5) 0.00%,rgba(8, 24, 37,0) 40.00%),linear-gradient(90deg, rgba(8, 24, 37, 0.5) 0.00%,rgba(8, 24, 37,0) 40.00%),linear-gradient(-90deg, rgba(8, 24, 37, 0.5) 0.00%,rgba(8, 24, 37,0) 40.00%),url(${generatedPPT.background.image})`
          }
          transition={"all 0.5s"}
        >
          <ModalBody placeContent={"center"}>
            {isGenerated ? (
              <Center
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Text
                  color={"white"}
                  textAlign={"center"}
                  fontSize={["2vh", null, "2vw", "1.2vw"]}
                  fontWeight={"bold"}
                >
                  {generatedPPTTitle.replace(/^"|"$/g, "")}
                </Text>
                <Button
                  w={["30vw", null, "12vw", "15vw"]}
                  h={["5vh", null, "4vh", "6vh"]}
                  fontSize={["3.5vw", null, "1.5vw", "1.4vw"]}
                  my={["4vh", "2vw"]}
                  color={"white"}
                  bgColor={"#FFFFFF50"}
                  backdropFilter={"auto"}
                  backdropBlur={"4px"}
                  _hover={{
                    bgColor: "#FFFFFF80",
                    shadow: "0 0 0.7vw #10223080",
                    // transform: "scale(1.01)",
                  }}
                  transition="all 0.3s"
                  borderRadius={["2vw", "1vw"]}
                  onClick={() => {
                    downloadPPT(generatedPPT, generatedPPTTitle);
                  }}
                >
                  Download
                </Button>
                <Button
                  w={["30vw", null, "12vw", "15vw"]}
                  h={["5vh", null, "4vh", "6vh"]}
                  fontSize={["3.5vw", null, "1.5vw", "1.4vw"]}
                  color={"white"}
                  bgColor={["#FFFFFF60", null, "#FFFFFF60", "#FFFFFF00"]}
                  backdropFilter={"auto"}
                  backdropBlur={"4px"}
                  _hover={{
                    bgColor: "#FFFFFF60",
                    // shadow: "0 0 0.7vw #10223080",
                    // transform: "scale(1.01)",
                  }}
                  transition="all 0.3s"
                  borderRadius={["2vw", "1vw"]}
                  onClick={() => {
                    location.reload();
                  }}
                >
                  Close
                </Button>
              </Center>
            ) : (
              <Flex justify={"center"} align={"center"} h={"100%"} w={"100%"}>
                {!error ? (
                  <Flex
                    flexDirection={"column"}
                    justify={"center"}
                    align={"center"}
                  >
                    <Spinner color="white" size={"xl"} />
                    <Text color={"white"} mt={"2vw"} textAlign={"center"}>
                      Your Presentation is generating, This might take around 1
                      - 3 minutes.
                    </Text>
                  </Flex>
                ) : (
                  <Center flexDirection={"column"}>
                    <Text
                      color={"#FFFFFF"}
                      fontWeight={"bold"}
                      mb={"5vh"}
                      fontSize={["3vh", "2vw"]}
                      textAlign={"center"}
                    >
                      Unable to Create Presentation
                    </Text>
                    <Text
                      color={"#FFFFFF"}
                      fontWeight={"bold"}
                      textAlign={"center"}
                    >
                      {error}
                    </Text>
                    <Button
                      w={["30vw", null, "12vw", "15vw"]}
                      h={["5vh", null, "4vh", "6vh"]}
                      fontSize={["3.5vw", null, "1.5vw", "1.4vw"]}
                      color={"white"}
                      bgColor={["#FFFFFF60", null, "#FFFFFF60", "#FFFFFF00"]}
                      backdropFilter={"auto"}
                      backdropBlur={"4px"}
                      _hover={{
                        bgColor: "#FFFFFF60",
                        // shadow: "0 0 0.7vw #10223080",
                        // transform: "scale(1.01)",
                      }}
                      transition="all 0.3s"
                      borderRadius={["2vw", "1vw"]}
                      mt={"4vh"}
                      onClick={() => {
                        onClose();
                      }}
                    >
                      Close
                    </Button>
                  </Center>
                )}
              </Flex>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
      <Center
        fontSize={["2vw", null, "1.3vw"]}
        bgSize={"cover"}
        w={"100%"}
        // h={"90vh"}
        bgImage={`linear-gradient(0deg, rgba(8, 24, 37, 0.2) 0.00%,rgba(8, 24, 37,0.2) 80.00%),linear-gradient(90deg, rgba(8, 24, 37, 0.4) 0.00%,rgba(8, 24, 37, 0.2) 30.00%),linear-gradient(90deg, rgba(8, 24, 37, 0.2) 70.00%,rgba(8, 24, 37, 0.4) 100.00%),linear-gradient(180deg, rgba(8, 24, 37, 0.2) 30.00%,rgb(8, 24, 37) 100.00%),url(${TextToPPTBG})`}
        flexDirection={"column"}
      >
        <Flex direction={"column"} align={"center"} mt={["30vh", "25vh"]}>
          <Text
            className="futuristic"
            color={"white"}
            fontSize={["2.5rem", null, "3.5rem", "5rem"]}
            fontWeight={"100"}
            letterSpacing={"0.5vw"}
            lineHeight={["10vw", "6vw"]}
            textShadow={"0 1vw 0.5vw #10223080"}
            cursor={"default"}
            textAlign={"center"}
            mb={"5vw"}
          >
            TEXT TO <br /> PRESENTATION
          </Text>
        </Flex>
        <Flex direction={"column"} gap={"3vh"}>
          <Flex align={"center"} justify={"space-between"}>
            <Input
              w={["80vw", null, "65vw"]}
              h={["10vw", null, "4vw"]}
              borderRadius={["5vw", "2vw 0 0 2vw"]}
              bgColor={"#00335Ce6"}
              backdropFilter={"blur(2px)"}
              transition={"all 0.3s"}
              border={"2px solid #00335C"}
              filter="drop-shadow(0 0 0.2vw #00335Ce6)"
              _focus={{
                filter: "drop-shadow(0 0 0.5vw #00335Ce6)",
                backgroundColor: "#00335Ce6",
                color: "#ffffffb5",
                textShadow: "0 0 0.4vw #ffffff30",
              }}
              color={"#ffffff60"}
              focusBorderColor="#ffffff20"
              variant={"filled"}
              _hover={{ backgroundColor: "#00335Ce6" }}
              placeholder="Give Description of your topic in 10 - 15 words"
              fontSize={["2.5vw", null, "1.3vw"]}
              px={"4vw"}
              className="robotoMono"
              onChange={(e) => {
                setPPTDetails({ ...pptDetails, description: e.target.value });
              }}
            />
            <Button
              w={"15vw"}
              h={"4vw"}
              display={["none", null, "inline"]}
              fontSize={["3.5vw", "1.4vw"]}
              color={"white"}
              bgColor={"#01EAF980"}
              _hover={{
                bgColor: "#01EAF9b3",
                shadow: "0 0 0.7vw #10223080",
                transform: "scale(1.01)",
                transition: "transform 0.3s",
              }}
              borderRadius={"0 2vw 2vw 0"}
              onClick={() => {
                generatePresentation(pptDetails, loggedInUser.Username);
              }}
            >
              Generate
            </Button>
          </Flex>
          <Flex
            h={["20vh", null, "5vh"]}
            w={"80vw"}
            flexWrap={"wrap"}
            // bgColor={"blue"}
            // justifyContent={"space-between"}
            gap={"2vw"}
            px={"2vw"}
          >
            <Flex>
              <Center
                fontSize={["3vw", null, "1.2vw"]}
                w={["15vw", null, "6vw"]}
                h={["4vh", null, "4vh", "5vh"]}
                borderRadius={["1.5vw 0 0 1.5vw", null, "0.5vw 0 0 0.5vw"]}
                bgColor={"#00335C"}
                className="robotoMono"
                color={"#ffffff90"}
              >
                Slides:{" "}
              </Center>
              <NumberInput
                defaultValue={5}
                max={10}
                min={3}
                clampValueOnBlur={true}
                focusBorderColor="#00335c"
                variant={"filled"}
                _hover={{ backgroundColor: "#102230" }}
                onChange={(e) => {
                  setPPTDetails({ ...pptDetails, no_of_slides: Number(e) });
                }}
              >
                <NumberInputField
                  borderRadius={["0 1.5vw 1.5vw 0", null, "0 0.5vw 0.5vw 0"]}
                  bgColor={"#10223050"}
                  backdropFilter={"auto"}
                  backdropBlur={"10px"}
                  h={["4vh", null, "4vh", "5vh"]}
                  _hover={{ backgroundColor: "#102230" }}
                  _focus={{ backgroundColor: "#102230" }}
                  border={"3px solid #00335C"}
                  w={["20vw", null, "9vw", "6vw"]}
                  color={"#ffffff90"}
                  fontSize={["3.5vw", null, "1.2vw"]}
                />
                <NumberInputStepper h={["3.5vh", null, "3.7vh", "4.9vh"]}>
                  <NumberIncrementStepper
                    border={"none"}
                    bgColor={"#00335C"}
                    color={"#ffffff80"}
                  />
                  <NumberDecrementStepper
                    border={"none"}
                    bgColor={"#00335C"}
                    color={"#ffffff90"}
                  />
                </NumberInputStepper>
              </NumberInput>
            </Flex>
            <Flex>
              <Center
                fontSize={["3vw", null, "1.2vw"]}
                w={["22vw", null, "10vw"]}
                h={["4vh", null, "4vh", "5vh"]}
                borderRadius={["1.5vw 0 0 1.5vw", null, "0.5vw 0 0 0.5vw"]}
                bgColor={"#00335C"}
                className="robotoMono"
                color={"#ffffff90"}
              >
                Color Tone:{" "}
              </Center>
              <Select
                variant={"filled"}
                _hover={{ backgroundColor: "#102230" }}
                borderRadius={["0 1.5vw 1.5vw 0", null, "0 0.5vw 0.5vw 0"]}
                bgColor={"#10223050"}
                backdropFilter={"auto"}
                backdropBlur={"10px"}
                h={["4vh", null, "4vh", "5vh"]}
                _focus={{ backgroundColor: "#102230" }}
                border={"3px solid #00335C"}
                w={["30vw", null, "12vw", "8vw"]}
                color={"#ffffff80"}
                onChange={(e) => {
                  setPPTDetails({ ...pptDetails, color_tone: e.target.value });
                }}
                fontSize={["3.5vw", null, "1.2vw"]}
              >
                {pptParameters.color_tone.map((e, i) => {
                  return (
                    <option
                      key={i}
                      style={{
                        backgroundColor: "#10223050",
                        backdropFilter: "auto",
                      }}
                      value={e}
                    >
                      {e}
                    </option>
                  );
                })}
              </Select>
            </Flex>
            <Flex>
              <Center
                fontSize={["3vw", null, "1.2vw"]}
                w={["15vw", null, "6vw"]}
                h={["4vh", null, "4vh", "5vh"]}
                borderRadius={["1.5vw 0 0 1.5vw", null, "0.5vw 0 0 0.5vw"]}
                bgColor={"#00335C"}
                className="robotoMono"
                color={"#ffffff90"}
              >
                Style:{" "}
              </Center>
              <Select
                variant={"filled"}
                _hover={{ backgroundColor: "#102230" }}
                borderRadius={["0 1.5vw 1.5vw 0", null, "0 0.5vw 0.5vw 0"]}
                bgColor={"#10223050"}
                backdropFilter={"auto"}
                backdropBlur={"10px"}
                h={["4vh", null, "4vh", "5vh"]}
                _focus={{ backgroundColor: "#102230" }}
                border={"3px solid #00335C"}
                w={["35vw", null, "15vw", "10vw"]}
                color={"#ffffff80"}
                onChange={(e) => {
                  setPPTDetails({ ...pptDetails, style: e.target.value });
                }}
                fontSize={["3vw", null, "1.2vw"]}
              >
                {pptParameters.style.map((e, i) => {
                  return (
                    <option
                      key={i}
                      style={{
                        backgroundColor: "#10223050",
                        backdropFilter: "auto",
                      }}
                      value={e}
                    >
                      {e}
                    </option>
                  );
                })}
              </Select>
            </Flex>
            <Flex>
              <Center
                fontSize={["3vw", null, "1.2vw"]}
                w={["30vw", null, "11vw"]}
                h={["4vh", null, "4vh", "5vh"]}
                borderRadius={["1.5vw 0 0 1.5vw", null, "0.5vw 0 0 0.5vw"]}
                bgColor={"#00335C"}
                className="robotoMono"
                color={"#ffffff90"}
              >
                Color Scheme:{" "}
              </Center>
              <Input
                variant={"filled"}
                _hover={{ backgroundColor: "#102230" }}
                borderRadius={["0 1.5vw 1.5vw 0", null, "0 0.5vw 0.5vw 0"]}
                bgColor={"#10223050"}
                backdropFilter={"auto"}
                backdropBlur={"10px"}
                h={["4vh", null, "4vh", "5vh"]}
                _focus={{ backgroundColor: "#102230" }}
                border={"3px solid #00335C"}
                w={["40vw", null, "12vw"]}
                color={"#ffffff80"}
                placeholder="Give any Color"
                onChange={(e) => {
                  setPPTDetails({
                    ...pptDetails,
                    color_scheme: e.target.value,
                  });
                }}
                fontSize={["3vw", null, "1.2vw"]}
              />
            </Flex>
          </Flex>
        </Flex>
        <Flex
          w={"100vw"}
          h={"10vh"}
          justify={"center"}
          align={"center"}
          pos={"fixed"}
          // bottom={"0vw"}
          top={"90vh"}
          bgColor={"#102230"}
          display={["flex", null, "none"]}
          zIndex={2}
        >
          <Button
            w={"40vw"}
            h={"10vw"}
            fontSize={["3.5vw", "1.4vw"]}
            color={"white"}
            bgColor={"#01EAF980"}
            _hover={{
              bgColor: "#01EAF9b3",
              shadow: "0 0 0.7vw #10223080",
              transform: "scale(1.01)",
              transition: "transform 0.3s",
            }}
            borderRadius={"5vw"}
            onClick={() => {
              generatePresentation(pptDetails, loggedInUser.username);
            }}
          >
            Generate
          </Button>
        </Flex>
      </Center>
      {historyPPT ? (
        <Center mt={"5vh"}>
          <Text
            color={"white"}
            fontSize={["3vh", "3vw"]}
            className="futuristic"
          >
            Generated Presentations
          </Text>
        </Center>
      ) : (
        <Center mt={"5vh"}>
          <Spinner color="white" size={"lg"} />
        </Center>
      )}
      {historyPPT && (
        <Flex
          w={"80vw"}
          mx={"auto"}
          my={"5vh"}
          flexDirection={["column", "row"]}
          flexWrap={["nowrap", "wrap"]}
          justify={"space-between"}
          gap={"2vw"}
        >
          {historyPPT.map((e, i) => {
            return (
              <Flex
                key={i}
                flexDirection={"column"}
                w={["100%", null, "48%"]}
                maxH={["20vh", null, "17vw", "13vw"]}
                // bgColor={"#102230e6"}
                bgImage={`linear-gradient(0deg, rgba(8, 24, 37, 0.5) 0.00%,rgba(8, 24, 37,0) 40.00%),linear-gradient(180deg, rgba(8, 24, 37, 0.5) 0.00%,rgba(8, 24, 37,0) 40.00%),linear-gradient(90deg, rgba(8, 24, 37, 0.5) 0.00%,rgba(8, 24, 37,0) 40.00%),linear-gradient(-90deg, rgba(8, 24, 37, 0.5) 0.00%,rgba(8, 24, 37,0) 40.00%),url(${e.presentation.background.image})`}
                _hover={{
                  filter: "drop-shadow(0 0 1vw #01EAF940)",
                }}
                transition="all 0.5s"
                borderRadius={"lg"}
                px={["3vw", "2vw"]}
                py={["1.5vh", "2vh"]}
                justify={"space-between"}
                gap={"2vh"}
              >
                <Text
                  fontSize={["2vh", null, "1.8vw", "1.5vw"]}
                  fontWeight={"bold"}
                  h={"50%"}
                  color={"white"}
                  className="robotoMono"
                >
                  {e.title.replace(/^"|"$/g, "")}
                </Text>
                <Flex justify={"space-between"}>
                  <Button
                    w={["30vw", null, "12vw", "15vw"]}
                    h={["5vh", null, "4vh", "6vh"]}
                    fontSize={["3.5vw", null, "1.5vw", "1.4vw"]}
                    color={"white"}
                    bgColor={"#01EAF980"}
                    backdropFilter={"auto"}
                    backdropBlur={"4px"}
                    _hover={{
                      bgColor: "#01EAF9b3",
                      shadow: "0 0 0.7vw #10223080",
                      transform: "scale(1.01)",
                    }}
                    transition="all 0.3s"
                    borderRadius={["2vw", "1vw"]}
                    onClick={() => {
                      downloadPPT(e.presentation, e.title);
                    }}
                  >
                    Download
                  </Button>
                </Flex>
              </Flex>
            );
          })}
        </Flex>
      )}
    </Flex>
  );
};

export default TextToPPT;
