import { ArrowDownIcon } from "@chakra-ui/icons";
import {
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React from "react";

const ImageModal = ({ closeDownloadOption,isOpen, toggleModal, e, ele, ind, downloadImage }) => {
  return (
    <Modal
    size={"xl"}
      isOpen={isOpen}
      isCentered
      onOverlayClick={() => {
        closeDownloadOption()
        toggleModal(false);
      }}
    >
      <ModalOverlay />
      <ModalContent
      px={"0"}
      maxWidth={["90vw",null,"65vw","38vw"]}
        bgColor={"#102230e6"}
        backdropFilter={"auto"}
        backdropBlur={"5px"}
      >
        <ModalHeader>
          <Text color={"white"}>{e.prompt + "-" + (ind + 1)}</Text>
          <ModalCloseButton
            onClick={() => {
                closeDownloadOption()
              toggleModal(false);
            }}
            color={"white"}
          />
        </ModalHeader>
        <ModalBody px={"0"} py={"0"}>
            <Image src={ele} />
        </ModalBody>
        <ModalFooter placeContent={"center"} py={["1vh","1vw"]}>
            <ArrowDownIcon boxSize={[6,,7]} color={"white"} cursor={"pointer"} _hover={{filter: "drop-shadow(0 0 0.3vw #01EAF9)"}} transition={"all 0.3s"} onClick={()=>{downloadImage(ele,e.prompt,ind+1)}}/>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ImageModal;
