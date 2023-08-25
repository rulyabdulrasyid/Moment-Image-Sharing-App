"use client";

import {
  Box,
  Flex,
  Button,
  useColorModeValue,
  Stack,
  useColorMode,
  Container,
  Heading,
  Spacer,
  HStack,
  useToast,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Logo } from "@/components";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const LinkItem = ({ href, path, children }) => {
  const active = path === href;
  const inactiveColor = useColorModeValue("gray.200", "whiteAlpha.900");

  return (
    <Link
      passHref
      href={href}
      p={2}
      bg={active ? "glassTeal" : undefined}
      color={active ? "#202023" : inactiveColor}
      _hover={{ color: useColorModeValue("red", "gray.500") }}
    >
      {children}
    </Link>
  );
};

function Navbar() {
  const [isLogin, setIsLogin] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    toast({
      title: "Logout",
      description: "You have successfully logged out.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    setIsLogin(false);
    router.push("/");
  };

  return (
    <div>
      <Flex
        boxShadow="lg"
        justifyContent="center"
        position="fixed"
        zIndex={1}
        top={0}
        width="100%"
        style={{ backdropFilter: "blur(10px)" }}
      >
        <Container
          as={Flex}
          flexDirection={{ base: "row", md: "row" }}
          maxW="6xl"
          alignItems="center"
          gap="10"
          style={{ backdropFilter: "blur(10px)" }}
          zIndex={1}
          p={{ base: 1, md: 2, lg: 2 }}
          transform="auto"
          // mt={1}
          // bg={"black"}
        >
          <Flex align="center">
            <Heading as="h1" size="xl" p={2} pt={0} pb={0}>
              <Logo />
            </Heading>
          </Flex>
          <Stack
            direction={{ base: "column", md: "row" }}
            display={{ base: "none", md: "flex" }}
            width={{ base: "full", md: "auto" }}
            alignItems="center"
            flexGrow={1}
            mt={{ base: 4, md: 0 }}
            gap={8}
            fontSize={{ base: "15px", md: "20px", lg: "25px" }}
            fontWeight="hairline"
            color={useColorModeValue("black", "white")}
          >
            <LinkItem href="/authentication">authentication</LinkItem>
            <LinkItem href="/galery">galery</LinkItem>
          </Stack>
          <Spacer />
          <Flex gap={2}>
            <Box>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
            </Box>
            <HStack>
              {!isLogin ? (
                <Button
                  onClick={() => router.push("/authentication")}
                  bg={"red"}
                >
                  Login
                </Button>
              ) : (
                <>
                  <Button onClick={handleLogout} bg={"red"}>
                    Logout
                  </Button>
                </>
              )}
            </HStack>
          </Flex>
        </Container>
      </Flex>
    </div>
  );
}

export default Navbar;
