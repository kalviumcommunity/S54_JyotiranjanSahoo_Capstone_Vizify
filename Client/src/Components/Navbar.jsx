import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Icon,
  Img,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { CgProfile } from "react-icons/cg";
import React from "react";
import Logo from "./../assets/Vizify_Logo.png";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Center display={["none", "flex"]}>
      <Flex
        backdropFilter={"auto"}
        backdropBlur={"5px"}
        pos={"fixed"}
        w={"98vw"}
        h={[null, "5vw", null, "4.4vw"]}
        bgColor={"#102230e6"}
        top={"1vw"}
        borderRadius={"5vh"}
        align={"center"}
        px={"3vw"}
        border={"3px solid #10223060"}
        filter={"drop-shadow(0 0.5vw 0.3vw #00000040 )"}
      >
        <Box w={"33%"} _hover={{
                filter: "drop-shadow(0 0 0.5vw #01EAF980)",
              }}
              transition={"all 0.2s"}>
          <Img src={Logo} maxH={"3vw"} />
        </Box>
        <Flex w={"33%"} justify={"space-between"}>
          <Button
            variant={"link"}
            fontSize={"1.3vw"}
            color={"white"}
            h={[null, "5vw", null, "4.4vw"]}
            _hover={{
              filter: "drop-shadow(0 0 0.2vw #ffffff90)",
            }}
            transition={"all 0.2s"}
          >
            Home
          </Button>
          <Center>
            <Divider orientation="vertical" opacity={"0.1"} h={"2.2vw"} />
          </Center>
          <Menu isOpen={isOpen}>
            <MenuButton
              variant={"link"}
              fontSize={"1.3vw"}
              h={[null, "5vw", null, "4.4vw"]}
              // rightIcon={isOpen?<ChevronDownIcon boxSize={6}/>:<ChevronDownIcon boxSize={6} />}
              color={"white"}
              _expanded={{ color: "#ffffffe6" }}
              as={Button}
              _focus={{ boxShadow: "none" }}
              onClick={isOpen ? onClose : onOpen}
              // onBlur={onClose}
              // onFocus={onOpen}
              onMouseEnter={onOpen}
              onMouseLeave={onClose}
              _hover={{
                filter: "drop-shadow(0 0 0.2vw #ffffff90)",
              }}
              transition={"all 0.2s"}
            >
              Explore{" "}
              {isOpen ? (
                <ChevronUpIcon boxSize={[null, 3, 4, 5, 6, 7]} />
              ) : (
                <ChevronDownIcon boxSize={[null, 3, 4, 5, 6, 7]} />
              )}
              {/* <ChevronDownIcon boxSize={[null,3,4,5,6,7]} /> */}
            </MenuButton>
            <MenuList
              m={"-0.51vw"}
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
              >
                Text To Presentation
              </MenuItem>
              <MenuItem
                bgColor={"#10223000"}
                borderRadius={"0.3vw"}
                _hover={{
                  backgroundColor: "#ffffff10",
                  transition: "all 0.5s",
                }}
                fontSize={[null, "1.3vw", null, "1vw"]}
                color={"white"}
              >
                Text To Image
              </MenuItem>
            </MenuList>
          </Menu>
          <Center>
            <Divider orientation="vertical" opacity={"0.1"} h={"2.2vw"} />
          </Center>
          <Button
            variant={"link"}
            fontSize={"1.3vw"}
            color={"white"}
            h={[null, "5vw", null, "4.4vw"]}
            _hover={{
              filter: "drop-shadow(0 0 0.2vw #ffffff90)",
            }}
            transition={"all 0.2s"}
          >
            About
          </Button>
        </Flex>
        <Flex w={"33%"} justify={"end"}>
          <Button variant={"link"}>
            <Icon
              transition={"all 0.3s"}
              _hover={{
                filter: "drop-shadow(0 0 0.3vw #ffffff90)",
                transform: "scale(1.05)",
              }}
              as={CgProfile}
              boxSize={7}
              color={"white"}
            />
          </Button>
        </Flex>
      </Flex>
    </Center>
  );
};

export default Navbar;
