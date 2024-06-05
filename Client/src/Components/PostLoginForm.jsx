import React, { useContext, useState } from "react";
import { context } from "./Context/AppContext";
import { useAuth0 } from "@auth0/auth0-react";
import { setCookie } from "./ManageCookies";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Text,
  Input,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";

const PostLoginForm = ({ isOpen, onClose, askUser }) => {
  // console.log(showModal);
  const { setLoginDone, setLoginSuccessfull, setLoggedInUser } =
    useContext(context);
  const { user } = useAuth0();
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isSocial = user?.sub?.split("|")[0] === "auth0" ? false : true;
    const postData = { ...user };

    if (isSocial) {
      postData.username = input;
      axios
        .post(`${import.meta.env.VITE_VIZIFY_BACKEND_USER}/tosocial`, postData)
        .then((res) => {
          setError(" ");
          setLoggedInUser(res.data.postUser);
          setCookie("Username",res.data.access_token,1)
          setLoginSuccessfull(true);
          setLoginDone(true);
          onClose();
        })
        .catch((err) => {
          setError(err.response?.data.error);
          setLoggedInUser({});
          setLoginSuccessfull(false);
          setLoginDone(true);
        });
    } else {
      postData.name = input;
      axios
        .post(import.meta.env.VITE_VIZIFY_BACKEND_USER, postData)
        .then((res) => {
          setError(" ");
          setLoggedInUser(res.data.postUser);
          setCookie("Username",res.data.access_token,1)
          setLoginSuccessfull(true);
          setLoginDone(true);
          onClose();
        })
        .catch((err) => {
          console.log(err.response?.data);
          setLoggedInUser({});
          setLoginSuccessfull(false);
          setLoginDone(true);
        });
    }

    // onClose();
  };

  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent
        // as={"flex"}
        py={"2vw"}
        backdropFilter={"auto"}
        backdropBlur={"5px"}
        borderRadius={["unset", "2xl"]}
        w={["90%", "55%", null, "40%"]}
        bgColor={"#102230f7"}
      >
        <ModalHeader
          textAlign={"center"}
          color={"white"}
          className="astro"
          letterSpacing={"0.1vw"}
        >
          New to the Website !
        </ModalHeader>
        <ModalBody py={6} justify="center" align="center">
          <Text color={"white"} fontSize={["4vw", "1.4vw"]}>
            Please Provide a {askUser}
          </Text>
          <Input
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit(e);
              }
            }}
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            w={["70vw", "40vw", null, "25vw"]}
            h={["10vw", "5vw", null, "3vw"]}
            my={"1vw"}
            bgColor={"#00335Ce6"}
            outline={"none"}
            border={"2px solid #092A44"}
            borderRadius={["2vw", "1vw", null, "0.5vw"]}
            textAlign={"center"}
            color={"#ffffffe6"}
          />
          <Text
            color={"#ffffff50"}
            fontStyle={"italic"}
            w={"90%"}
            fontSize={["3vw", "1vw"]}
          >
            It helps us to identify you better <br />
            (You have to give this information to proceed with the website)
          </Text>
          {loading ? (
            <Spinner color="white" my={"1vw"} />
          ) : (
            error != "" && (
              <Text color={"#ff0000"} fontWeight={"bold"}>
                {error}
              </Text>
            )
          )}
        </ModalBody>

        <ModalFooter m={"0 auto"}>
          <Button
            bgColor={"#01EAF980"}
            mt={["5vw", "1vw"]}
            fontSize={["3.5vw", "1.4vw"]}
            color={"white"}
            w={["35vw", "12vw"]}
            h={["7vh", "7vh", "6.5vh", "8vh"]}
            borderRadius={["3.5vh", "3.5vh", "3.25vh", "4.25vh"]}
            backdropFilter={"auto"}
            backdropBlur={"2px"}
            shadow={"0 0 1vw #10223080"}
            _hover={{
              bgColor: "#01EAF9b3",
              shadow: "0 0 0.7vw #10223080",
              transform: "scale(1.01)",
              transition: "transform 0.3s",
            }}
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            Add {askUser}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PostLoginForm;
