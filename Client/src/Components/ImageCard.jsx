import { ArrowDownIcon } from "@chakra-ui/icons";
import { Box, Center, Image, SlideFade, useDisclosure } from "@chakra-ui/react";
import { saveAs } from "file-saver";
import React, { useState } from "react";
import ImageModal from "./ImageModal";

const ImageCard = ({ e, ele, ind }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showmodal, setShowModal] = useState(false);
  const downloadImage = (image, name, index) => {
    const imageName = name + "-" + index;
    saveAs(image, imageName);
  };
  return (
    <Box
      pos={"relative"}
      onMouseEnter={() => {
        onOpen();
      }}
      onMouseLeave={() => {
        onClose();
      }}
      _hover={{
        filter: "drop-shadow(0 0 1vw #01EAF920)",
      }}
    >
        <ImageModal closeDownloadOption={onClose} isOpen={showmodal} toggleModal={setShowModal} e={e} ele={ele} ind={ind} downloadImage = {downloadImage}/>
      <Image

        transition={"all 0.5s"}
        src={ele}
        borderRadius={"lg"}
        maxWidth={["100%",e.images.length == 1 ? "50vw" : "35vw"]}
        maxHeight={["80vw","22vw"]}
        onClick={() => setShowModal(true)}
      />
      <SlideFade in={isOpen}>
        <Center
          pos={"absolute"}
          bottom="0"
          // left="50%"
          bgImage={
            "linear-gradient(0deg, rgba(16,34,48, 0.9) 0.00%,rgba(16,34,48,0) 100.00%)"
          }
          // transform="translateX(-50%)"
          w={"100%"}
          height={"3vw"}
          borderRadius={"lg"}
          // zIndex="1"
          // opacity="0"
          // transition="opacity 0.5s"
          // _groupHover={{ opacity: "1" }}
        >
          <ArrowDownIcon
            cursor={"pointer"}
            boxSize={[4,null,5,7]}
            color={"white"}
            onClick={() => {
              downloadImage(ele, e.prompt, ind + 1);
            }}
          />
        </Center>
      </SlideFade>
    </Box>
  );
};

export default ImageCard;
