"use client";

import {
  Button,
  Checkbox,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  InputGroup,
  InputRightElement,
  Input,
  Stack,
  Image,
  Box,
  HStack,
  Grid,
  useToast,
  Container,
  Center,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { postLoginData } from "@/fetching/postData";
import { useRouter } from "next/navigation";

export default function authentication() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toast = useToast();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    postLoginData(username, password)
      .then((data) => {
        const { token } = data;
        sessionStorage.setItem("accessToken", token);
        // setIsLogin(true);
        router.push("/galery");
        toast({
          title: "Login",
          description: "You have successfully Login.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((err) => {
        const error = new Error(e);
        toast({
          title: "An error occurred.",
          description: error?.message || "An error occurred. Please try again.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  const handleTabSignUp = () => {
    setNewAccount(true);
  };

  const handleTabSignIn = () => {
    setNewAccount(false);
  };

  return (
    <Container maxW="6xl">
      <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
        <Flex p={8} justify={"center"} align="center" width="50%">
          {!newAccount ? (
            <Stack spacing={5} w={"full"}>
              <Heading fontSize="9xl" mb={5}>
                signIn.
              </Heading>
              <FormControl id="username">
                <Input
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </FormControl>
              <FormControl id="password">
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              {/* BUTTON */}

              <Stack justifyContent="space-between">
                <Button
                  colorScheme={"blue"}
                  variant={"solid"}
                  onClick={handleSubmit}
                >
                  Sign in
                </Button>
                <Button
                  colorScheme={"blue"}
                  variant="outline"
                  onClick={handleTabSignUp}
                >
                  Don't Have an account? Sign up
                </Button>
              </Stack>
            </Stack>
          ) : (
            <Stack spacing={5} w={"full"} mt={10}>
              <Heading fontSize="9xl" mb={8}>
                signUp.
              </Heading>
              <FormControl id="firstname">
                <Input
                  placeholder="Firstname"
                  // onChange={(e) => setUsername(e.target.value)}
                />
              </FormControl>
              <FormControl id="lastname">
                <Input
                  placeholder="Lastname"
                  // onChange={(e) => setUsername(e.target.value)}
                />
              </FormControl>
              <FormControl id="username">
                <Input
                  placeholder="Username"
                  // onChange={(e) => setUsername(e.target.value)}
                />
              </FormControl>
              <FormControl id="password">
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    // onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl id="confirmpassword">
                <InputGroup>
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    // onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowConfirmPassword(
                          (showConfirmPassword) => !showConfirmPassword
                        )
                      }
                    >
                      {showConfirmPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              {/* BUTTON */}

              <Stack justifyContent="space-between">
                <Button
                  colorScheme={"blue"}
                  variant={"solid"}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
                <Button
                  colorScheme={"blue"}
                  variant="outline"
                  onClick={handleTabSignIn}
                >
                  Have account, please sign in
                </Button>
              </Stack>
            </Stack>
          )}
        </Flex>
        <Flex width="50%">
          <Center>
            <Image
              align="center"
              boxShadow="xl"
              borderRadius={50}
              alt={"Login Image"}
              objectFit={"cover"}
              src={
                "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
              }
            />
          </Center>
        </Flex>
      </Stack>
    </Container>
  );
}
