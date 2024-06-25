import React, { useContext, useLayoutEffect, useRef, useState } from "react";
import TextToImgBG from "./../assets/Text_to_image_bg.jpg";
import { context } from "./Context/AppContext";
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
  Spinner,
  useDisclosure,
  SkeletonText,
  Skeleton,
} from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router";
import ImageCard from "./ImageCard";
import axios from "axios";

const TextToIMG = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setFooterDisplay, loggedInUser, loginSuccessfull, loginDone } =
    useContext(context);
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate(null);
  const inputRef = useRef(null)
  const [postedImageInputs, setpostedImageInputs] = useState({});
  const [isGenerated, setIsGenerated] = useState(true);
  const [historyImages, setHistoryImages] = useState([]);
  const [error, setError] = useState(null);
  const [imgDetails, setIMGDetails] = useState({
    prompt: "",
    no_of_images: 2,
    style: "photographic",
    dimensions: "1344x768",
  });


  const imgParameters = {
    style: [
      "photographic",
      "3d-model",
      "analog-film",
      "anime",
      "cinematic",
      "comic-book",
      "digital-art",
      "enhance",
      "fantasy-art",
      "isometric",
      "line-art",
      "low-poly",
      "modeling-compound",
      "neon-punk",
      "origami",
      "pixel-art",
      "tile-texture",
    ],
    dimensions: [
      "1344x768",
      "768x1344",
      "1152x896",
      "896x1152",
      "1536x640",
      "640x1536",
      "1024x1024",
      "1216x832",
    ],
  };

  const generateImage = (imgDetails, username) => {
    const postOption = { ...imgDetails, username };
    setpostedImageInputs(imgDetails);
    setIMGDetails({ ...imgDetails, prompt: "" });
    setIsGenerated(false);
    setError(null)
    axios
      .post(import.meta.env.VITE_VZIFIY_BACKEND_IMAGE, postOption)
      .then((res) => {
        console.log(res.data);
        setHistoryImages([res.data.postImage, ...historyImages]);
        setIsGenerated(true);
        setpostedImageInputs({});
        setError(null);
      })
      .catch((err) => {
        if (err) {
          console.log(err.response?.data.error);
          setError(err.response?.data.error);
          setIsGenerated(true);
          setpostedImageInputs({});
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
      } else {
        setHistoryImages(loggedInUser.Images);
      }
    }
  }, [isAuthenticated, loginDone, loginSuccessfull]);
  return (
    <Box>
      <Center
        fontSize={["2vw", null, "1.3vw"]}
        bgSize={"cover"}
        w={"100%"}
        // h={"80vh"}
        bgImage={`linear-gradient(0deg, rgba(8, 24, 37, 0.2) 0.00%,rgba(8, 24, 37,0.2) 80.00%),linear-gradient(90deg, rgba(8, 24, 37, 0.4) 0.00%,rgba(8, 24, 37, 0.2) 30.00%),linear-gradient(90deg, rgba(8, 24, 37, 0.2) 70.00%,rgba(8, 24, 37, 0.4) 100.00%),linear-gradient(180deg, rgba(8, 24, 37, 0.2) 30.00%,rgb(8, 24, 37) 100.00%),url(${TextToImgBG})`}
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
            TEXT TO <br /> IMAGE
          </Text>
        </Flex>
        <Flex direction={"column"} gap={"3vh"}>
          <Flex align={"center"} justify={"space-between"}>
            <Input
            ref={inputRef}
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
              placeholder="Give Prompt to Generate Image"
              fontSize={["3.5vw", null, "1.3vw"]}
              px={"4vw"}
              className="robotoMono"
              onChange={(e) => {
                setIMGDetails({ ...imgDetails, prompt: e.target.value });
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
              onClick={()=>{
                if(inputRef.current){
                  inputRef.current.value = ""
                }
                generateImage(imgDetails,loggedInUser.Username)}}
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
                w={["17vw", null, "6vw"]}
                h={["4vh", null, "4vh", "5vh"]}
                borderRadius={["1.5vw 0 0 1.5vw", null, "0.5vw 0 0 0.5vw"]}
                bgColor={"#00335C"}
                className="robotoMono"
                color={"#ffffff90"}
              >
                Images:{" "}
              </Center>
              <NumberInput
                defaultValue={2}
                max={4}
                min={1}
                clampValueOnBlur={true}
                focusBorderColor="#00335c"
                variant={"filled"}
                _hover={{ backgroundColor: "#102230" }}
                onChange={(e) => {
                  setIMGDetails({ ...imgDetails, no_of_images: Number(e) });
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
                  fontSize={["3vw", null, "1.2vw"]}
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
                w={["40vw", null, "12vw", "15vw"]}
                color={"#ffffff80"}
                onChange={(e) => {
                  setIMGDetails({ ...imgDetails, style: e.target.value });
                }}
                fontSize={["3vw", null, "1.2vw"]}
              >
                {imgParameters.style.map((e, i) => {
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
                w={["25vw", null, "10vw"]}
                h={["4vh", null, "4vh", "5vh"]}
                borderRadius={["1.5vw 0 0 1.5vw", null, "0.5vw 0 0 0.5vw"]}
                bgColor={"#00335C"}
                className="robotoMono"
                color={"#ffffff90"}
              >
                Dimensions:{" "}
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
                w={["33vw", null, "15vw", "10vw"]}
                color={"#ffffff80"}
                onChange={(e) => {
                  setIMGDetails({ ...imgDetails, dimensions: e.target.value });
                }}
                fontSize={["3vw", null, "1.2vw"]}
              >
                {imgParameters.dimensions.map((e, i) => {
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
          </Flex>
        </Flex>
        <Flex
          w={"100vw"}
          h={"15vw"}
          justify={"center"}
          align={"center"}
          pos={"fixed"}
          bottom={"0vw"}
          bgColor={"#102230"}
          display={["flex", null, "none"]}
          zIndex={1}
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
            onClick={()=>{generateImage(imgDetails,loggedInUser.Username)}}
          >
            Generate
          </Button>
        </Flex>
      </Center>
      {loginSuccessfull ? (
        <Center mt={"5vh"}>
          <Text
            color={"white"}
            fontSize={["3vh", "3vw"]}
            className="futuristic"
          >
            Generated Images
          </Text>
        </Center>
      ) : (
        <Center mt={"5vh"}>
          <Spinner color="white" size={"lg"} />
        </Center>
      )}
      {historyImages && (
        <Flex
          w={"80vw"}
          mx={"auto"}
          py={"5vh"}
          flexDirection={["column"]}
          flexWrap={["nowrap", "wrap"]}
          justify={"space-between"}
          gap={"2vw"}
        >
          {loginSuccessfull && !isGenerated && (
            <Flex
              px={"4vw"}
              py={"4vh"}
              w={"100%"}
              borderRadius={"2xl"}
              direction={"column"}
              bgColor={"#102230"}
            >
              <Text
                color={"white"}
                fontSize={["2.5vh", null, "2vw", "1.5vw"]}
                className="robotoMono"
                mb={["3vh", "2vw"]}
                textAlign={["center", "left"]}
              >
                {postedImageInputs.prompt}
              </Text>
              <Center
                color={"white"}
                className="futuristic"
                fontSize={["2.5vh", null, "2vw", "3vw"]}
              >
                <Spinner
                  size={["lg", null, "lg", "xl"]}
                  color="white"
                  mr={"2vw"}
                />{" "}
                Generating ...
              </Center>
            </Flex>
          )}
          {loginSuccessfull && error && (
            <Flex
              direction={"column"}
              bgColor={"#102230"}
              px={"4vw"}
              py={"4vh"}
              w={"100%"}
              borderRadius={"2xl"}
            >
              <Text
                color={"white"}
                fontSize={["2.5vh", null, "2vw", "1.5vw"]}
                className="robotoMono"
                mb={["3vh", "2vw"]}
                textAlign={["center", "left"]}
              >
                {postedImageInputs.prompt}
              </Text>
              <Flex
                direction={"column"}
                align={"center"}
                justify={"center"}
              >
                <Text
                  color={"white"}
                  fontSize={["3.5vw", null, "1.5vw", "1.4vw"]}
                  mb={"2vw"}
                  textAlign={"center"}
                  className="robotoMono"
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
                  onClick={() => {
                    setError(null);
                  }}
                >
                  Close
                </Button>
              </Flex>
            </Flex>
          )}
          {historyImages.map((e, i) => {
            return (
              <Flex
                key={i}
                px={"4vw"}
                py={"4vh"}
                w={"100%"}
                borderRadius={"2xl"}
                direction={"column"}
                bgImage={`linear-gradient(0deg, rgba(16,34,48, 1) 5.00%,rgba(16,34,48,0.4) 40.00%),linear-gradient(180deg, rgba(16,34,48, 1) 5.00%,rgba(16,34,48,0.4) 40.00%),linear-gradient(90deg, rgba(16,34,48, 1) 5.00%,rgba(16,34,48,0.4) 40.00%),linear-gradient(-90deg, rgba(16,34,48, 1) 5.00%,rgba(16,34,48,0.4) 40.00%),url(${e.images[0]})`}
              >
                <Text
                  color={"white"}
                  fontSize={["2.5vh", null, "2vw", "1.5vw"]}
                  className="robotoMono"
                  mb={["2vh", "2vw"]}
                  textAlign={["center", "left"]}
                >
                  {e.prompt}
                </Text>
                <Flex
                  flexWrap={"wrap"}
                  gap={["2vh", "2vw"]}
                  flexDirection={["column", "row"]}
                >
                  {e.images.map((ele, ind) => {
                    return <ImageCard e={e} ele={ele} key={ind} ind={ind} />;
                  })}
                </Flex>
              </Flex>
            );
          })}
        </Flex>
      )}
    </Box>
  );
};

export default TextToIMG;
