import { Button, Fade, Icon, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { TbLogin2 } from "react-icons/tb";
import { useAuth0 } from "@auth0/auth0-react";


const LoginButton = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { loginWithRedirect } = useAuth0();

  return (
    <Button
      variant={"link"}
      color={"white"}
      fontSize={"1.3vw"}
      h={[null, "5vw", null, "3vw"]}
      transform={"translateX(5vw)"}
      px={"1.5vw"}
      
      _hover={{
        filter: "drop-shadow(0 0 0.2vw #ffffff90)",
        borderRadius: "3vw",
        transition: "all 0.4s",
        transform: "translateX(2vw)"
      }}
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
      leftIcon={<Icon as={TbLogin2} boxSize={7} color={"white"} />}

      onClick={()=>loginWithRedirect()}
    >
      <Fade className="robotoMono" in={isOpen}>Login</Fade>
    </Button>
  );
};

export default LoginButton;
