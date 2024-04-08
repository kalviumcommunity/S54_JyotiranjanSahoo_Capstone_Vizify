import {
  Button,
  Fade,
  Center,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { MdManageAccounts } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { useAuth0 } from "@auth0/auth0-react";
import { TbLogout2 } from "react-icons/tb";
import { useNavigate } from "react-router";
import { context } from "./Context/AppContext";

const ProfileMenu = ({ userData }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, logout, isLoading } = useAuth0();

  const navigate = useNavigate();
  return (
    <Menu isOpen={isOpen}>
      <MenuButton
        variant={"ghost"}
        bgColor={"transparent"}
        _hover={{backgroundColor: "transparent"}}
        w={"15vw"}
        px={"0"}
        h={[null, "5vw", null, "4.4vw"]}
        color={"white"}
        _expanded={{ color: "#ffffffe6", backgroundColor: "transparent"}}
        as={Button}
        _focus={{ boxShadow: "none" }}
        onClick={isOpen ? onClose : onOpen}
        display={"flex"}
        justifyContent={"end"}
        filter={`${
          isOpen
            ? "drop-shadow(0 0 0.2vw #ffffff90)"
            : "drop-shadow(0 0 0vw #ffffff00)"
        }`}
        onMouseEnter={onOpen}
        onMouseLeave={onClose}
        transition={"all 0.4s"}
        leftIcon={
          <Icon
            as={CgProfile}
            boxSize={7}
            color={"white"}
            transform={`${isOpen ? "translateX(0vw)" : "translateX(12vw)"}`}
            transition={"all 0.4s"}
          />
        }
      >
        <Center
          transform={`${isOpen ? "translateX(0vw)" : "translateX(12vw)"}`}
          transition={"all 0.4s"}
          variant={"link"}
          color={"white"}
          fontSize={"1.2vw"}
          h={[null, "5vw", null, "3vw"]}
        >
          <Fade in={isOpen}>{user.name}</Fade>
        </Center>
      </MenuButton>
      <MenuList
        my={[null,"-1vw",null,"-0.51vw"]}
        onMouseEnter={onOpen}
        onMouseLeave={onClose}
        bgColor={"#102230e6"}
        border={"none"}
        p={"0.5vw"}
      >
        <MenuItem
          bgColor={"#10223000"}
          borderRadius={"0.3vw"}
          _hover={{
            backgroundColor: "#ffffff10",
            transition: "all 0.5s",
          }}
          fontSize={[null, "1.3vw", null, "1vw"]}
          color={"white"}
          onClick={() => {
            navigate("/profile");
          }}
          fontWeight={"semibold"}
        >
          <Icon as={MdManageAccounts} boxSize={6} mr={"1vw"} />
          Profile
        </MenuItem>
        <MenuItem
          bgColor={"#10223000"}
          borderRadius={"0.3vw"}
          _hover={{
            backgroundColor: "#ffffff10",
            transition: "all 0.5s",
          }}
          fontSize={[null, "1.3vw", null, "1vw"]}
          color={"#DA3633"}
          fontWeight={"semibold"}
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
        >
          <Icon as={TbLogout2} boxSize={6} mr={"1vw"} />
          LogOut
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ProfileMenu;
