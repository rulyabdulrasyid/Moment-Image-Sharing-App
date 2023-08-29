"use client";

import React, { useEffect, useState } from "react";
import {
  Flex,
  Button,
  Tooltip,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalOverlay,
  Input,
  Stack,
  Box,
  FormLabel,
  Textarea,
  Select,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { fetchCategory } from "@/fetching/fetchData";

function CreateImage() {
  const OverlayOne = () => (
    <ModalOverlay
      bg="none"
      backdropFilter="auto"
      backdropInvert="20%"
      backdropBlur="2px"
    />
  );
  const [overlay, setOverlay] = React.useState(<OverlayOne />);

  const handleOpenModal = () => {
    setIsOpen(true);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [details, setDetails] = useState({
    image: "",
    title: "",
    description: "",
    date: "",
    location: "",
    category_id: 0,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await fetchCategory();
      setCategories(categories);
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleCategoryChange = (e) => {
    setDetails((prev) => {
      const categoryId = parseInt(e.target.value);
      return { ...prev, category_id: categoryId };
    });
  };

  const handleSubmit = async (e) => {
    const accessToken = sessionStorage.getItem("accessToken");
    e.preventDefault();
    // console.log(details.title);
    try {
      await postImage(details.image);
    } catch (err) {}
  };

  return (
    <>
      <Flex
        position="fixed"
        zIndex={1}
        bottom={0}
        width="100%"
        mb={20}
        // justify="right"
      >
        <Tooltip hasArrow label="Add Image" bg="teal">
          <Button
            colorScheme="teal"
            onClick={() => {
              setOverlay(<OverlayOne />);
              handleOpenModal();
            }}
            //   mr={10}
          >
            {<AddIcon />}
          </Button>
        </Tooltip>
        <Modal isCentered isOpen={isOpen} onClose={handleCloseModal} bord>
          {overlay}
          <ModalContent>
            <ModalHeader
              borderBottomWidth="1px"
              bg="red"
              color="white"
              borderRadius={5}
            >
              ADD NEW IMAGE
            </ModalHeader>
            <ModalCloseButton color={"white"} />
            <ModalBody>
              <Stack>
                <Box>
                  <FormLabel>Image</FormLabel>
                  <Input
                    placeholder="Link Image"
                    focusBorderColor="red.400"
                    name="image"
                    value={details.image}
                    onChange={handleChange}
                  />
                  {/* <Input
                  variant="ghost"
                  size="sm"
                  type="file"
                  accept="image/*"
                  mb={4}
                /> */}
                </Box>
                <Box>
                  <FormLabel>Title</FormLabel>
                  <Input
                    placeholder="Image Title"
                    focusBorderColor="red.400"
                    name="title"
                    value={details.title}
                    onChange={handleChange}
                  />
                </Box>
                <Box>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    focusBorderColor="red.400"
                    placeholder="Write image description"
                    name="description"
                    value={details.text}
                    onChange={handleChange}
                  />
                </Box>
                <Box>
                  <FormLabel>Date</FormLabel>
                  <Input
                    focusBorderColor="red.400"
                    placeholder="Select Date and Time"
                    size="md"
                    type="datetime-local"
                    name="date"
                    value={details.date}
                    onChange={handleChange}
                  />
                </Box>
                <Box>
                  <FormLabel>Location</FormLabel>
                  <Input
                    placeholder="location"
                    focusBorderColor="red.400"
                    name="location"
                    value={details.location}
                    onChange={handleChange}
                  />
                </Box>
                <Box>
                  <FormLabel>Image Category</FormLabel>
                  <Select
                    value={details.category_id}
                    onChange={handleCategoryChange}
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </Select>
                </Box>
              </Stack>
            </ModalBody>
            <ModalFooter borderTopWidth="1px">
              <Button variant="outline" mr={3} onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button colorScheme="blue" onClick={handleSubmit}>
                Submit
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </>
  );
}

export default CreateImage;
