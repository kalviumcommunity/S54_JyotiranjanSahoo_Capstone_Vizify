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
} from "@chakra-ui/react";
import TextToPPTBG from "./../assets/Text_to_ppt_bg.png";
import { useContext, useLayoutEffect } from "react";
import { context } from "./Context/AppContext";

const TextToPPT = () => {
  const { setFooterDisplay } = useContext(context);

  useLayoutEffect(() => {
    setFooterDisplay(false);

    return () => {
      setFooterDisplay(true);
    };
  }, []);

  return (
    <Box>
      <Center
        bgSize={"cover"}
        w={"100%"}
        h={"90vh"}
        bgImage={`linear-gradient(0deg, rgba(8, 24, 37, 0.2) 0.00%,rgba(8, 24, 37,0.2) 80.00%),linear-gradient(90deg, rgba(8, 24, 37, 0.4) 0.00%,rgba(8, 24, 37, 0.2) 30.00%),linear-gradient(90deg, rgba(8, 24, 37, 0.2) 70.00%,rgba(8, 24, 37, 0.4) 100.00%),linear-gradient(180deg, rgba(8, 24, 37, 0.2) 30.00%,rgb(8, 24, 37) 100.00%),url(${TextToPPTBG})`}
        flexDirection={"column"}
      >
        <Flex direction={"column"} align={"center"}>
          <Text
            className="futuristic"
            color={"white"}
            fontSize={["2.5rem", "7rem"]}
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
          <Input
            w={"80vw"}
            h={"4vw"}
            borderRadius={"full"}
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
            focusBorderColor="#ffffff20"
            variant={"filled"}
            _hover={{ backgroundColor: "#00335Ce6" }}
            placeholder="Give Description of your topic in 10 - 15 words"
            fontSize={"1.3vw"}
            px={"2vw"}
            className="robotoMono"
          />
          <Flex>
            <Flex ml={"2vw"}>
              <Center
                w={"6vw"}
                h={"5vh"}
                borderRadius={"0.5vw 0 0 0.5vw"}
                bgColor={"#00335C"}
                className="robotoMono"
                color={"#ffffff90"}
              >
                Slides:{" "}
              </Center>
              <NumberInput
                defaultValue={5}
                max={10}
                min={1}
                clampValueOnBlur={true}
                focusBorderColor="#00335c"
                variant={"filled"}
                _hover={{ backgroundColor: "#102230" }}
              >
                <NumberInputField
                  borderRadius={"0 0.5vw 0.5vw 0"}
                  bgColor={"#10223050"}
                  backdropFilter={"auto"}
                  backdropBlur={"10px"}
                  h={"5vh"}
                  _hover={{ backgroundColor: "#102230" }}
                  _focus={{ backgroundColor: "#102230" }}
                  border={"3px solid #00335C"}
                  w={"7vw"}
                  color={"#ffffff90"}
                />
                <NumberInputStepper>
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
          </Flex>
        </Flex>
      </Center>
    </Box>
  );
};

export default TextToPPT;
