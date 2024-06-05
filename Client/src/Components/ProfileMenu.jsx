import {
  Button,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
  Box,
  Skeleton,
  Flex,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { CgProfile } from "react-icons/cg";
import { useAuth0 } from "@auth0/auth0-react";
import { TbLogout2 } from "react-icons/tb";
import { useNavigate } from "react-router";
import { context } from "./Context/AppContext";
import { deleteCookie } from "./ManageCookies";

const ProfileMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, logout } = useAuth0();
  const {
    setAllUsers,
    setLoginDone,
    setUserId,
    setUserData,
    setLoggedInUser,
    loggedInUser,
  } = useContext(context);
  const navigate = useNavigate();
  return (
    <Menu isOpen={isOpen}>
      <MenuButton
        variant={"ghost"}
        px={"0"}
        h={[null, "5vw", null, "4.4vw"]}
        color={"white"}
        _expanded={{ color: "#ffffffe6", backgroundColor: "transparent" }}
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
            transition={"all 0.4s"}
          />
        }
      ></MenuButton>
      <MenuList
        my={[null, "-1vw", null, "-0.62vw"]}
        onMouseEnter={onOpen}
        onMouseLeave={onClose}
        bgColor={"#102230e6"}
        border={"none"}
        p={"0.5vw"}
      >
        {loggedInUser.Name ? <MenuItem
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
          className="robotoMono"
        >
          <Box
            w={"2vw"}
            h={"2vw"}
            borderRadius={"full"}
            bgImage={`url(${user.picture})`}
            bgSize={"contain"}
            mr={"1vw"}
          ></Box>
          {loggedInUser.Name}
        </MenuItem>:<MenuItem
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
          className="robotoMono"
        >
          <Flex justify={"space-between"} w={"100%"}>
            <Skeleton w={"3vw"} h={"3vw"} borderRadius={"full"} mr={"1vw"}>
              <Box
                w={"2vw"}
                h={"2vw"}
                borderRadius={"full"}
                bgImage={`url(${user.picture})`}
                bgSize={"contain"}
                mr={"1vw"}
              ></Box>
            </Skeleton>
              <Skeleton borderRadius={"full"} w={"100%"}>Diplay Name</Skeleton>
          </Flex>
        </MenuItem>}
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
          onClick={() => {
            logout({ logoutParams: { returnTo: window.location.origin } });
            deleteCookie("username");
            setUserData({});
            setLoggedInUser({});
            setLoginDone(false);
            setUserId("");
            setAllUsers([]);
          }}
          className="robotoMono"
        >
          <Icon as={TbLogout2} boxSize={6} mr={"1vw"} />
          LogOut
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ProfileMenu;
