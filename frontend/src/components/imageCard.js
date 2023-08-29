"use client";

import {
  Box,
  Image,
  Stack,
  Text,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Center,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Tooltip,
  Grid,
  Link,
  useToast,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { deleteImage } from "@/fetching/deleteData";

function ImageCard(props) {
  const { id, title, image, date, location } = props;
  const router = useRouter();
  const OverlayOne = () => (
    <ModalOverlay
      bg="none"
      backdropFilter="auto"
      backdropInvert="40%"
      backdropBlur="2px"
    />
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayOne />);
  const [isLogin, setIsLogin] = useState(false);

  const handleImageDetail = (imageId) => {
    router.push(`/images/${imageId}`);
  };

  const [imageList, setImageList] = useState([]);
  const toast = useToast();

  const handleDelete = async (imageId) => {
    const accessToken = sessionStorage.getItem("accessToken");
    try {
      await deleteImage(imageId, accessToken);
      toast({
        title: "Image deleted",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      const updatedImageList = imageList.filter(
        (image) => image.id !== imageId
      );
      setImageList(updatedImageList);
      router.push("/galery");
    } catch (error) {
      toast({
        title: "Error deleting Image",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  return (
    <Stack
      as={Link}
      _hover={{ textDecoration: "none" }}
      onClick={() => {
        setOverlay(<OverlayOne />);
        onOpen();
      }}
    >
      <Box maxW={"350px"} w={"full"}>
        <Box
          h={"200px"}
          // bg={"gray.100"}
          overflow={"hidden"}
          rounded={"xl"}
          objectFit={"cover"}
        >
          <Image
            src={image}
            alt="Example"
            transition="0.3s ease-in-out"
            _hover={{ transform: "scale(1.05)" }}
          />
        </Box>
        <Box mt={2} mb={4}>
          <Text fontWeight="semibold">
            {title}, {date}
          </Text>
        </Box>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        {overlay}
        <ModalContent bg="transparent">
          <ModalBody>
            <Center>
              <Popover placement="auto">
                <PopoverTrigger>
                  <Box as={Link} _hover={{ textDecoration: "none" }}>
                    <Tooltip label="Click to Action" fontSize="xl">
                      <Image src={image} alt="Example" borderRadius="20px" />
                    </Tooltip>
                  </Box>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverBody>
                    {!isLogin ? (
                      <Grid>
                        <Button
                          colorScheme="blue"
                          onClick={() => {
                            handleImageDetail(id);
                          }}
                        >
                          DETAIL
                        </Button>
                      </Grid>
                    ) : (
                      <Grid templateColumns="repeat(3, 1fr)" gap={2}>
                        <Button colorScheme="green">EDIT</Button>
                        <Button
                          colorScheme="red"
                          onClick={() => {
                            handleDelete(id);
                          }}
                        >
                          DELETE
                        </Button>
                        <Button
                          colorScheme="blue"
                          onClick={() => {
                            handleImageDetail(id);
                          }}
                        >
                          DETAIL
                        </Button>
                      </Grid>
                    )}
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Stack>
  );
}

export default ImageCard;
