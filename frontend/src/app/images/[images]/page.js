"use client";

import React, { useEffect, useState } from "react";
import {
  Flex,
  Container,
  Heading,
  Image,
  Center,
  Text,
} from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { fetchImageById } from "@/fetching/fetchById";

export default function DetailImagePage(imageId) {
  const [image, setImage] = useState({});
  const pathname = usePathname();
  const [, , value] = pathname.split("/");

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const image = await fetchImageById(value);
        setImage(image);
      } catch (err) {
        console.error("Error fetching image:", err);
      }
    };
    fetchImage();
  }, [value]);

  return (
    <>
      <Flex mt={20} justify="center" minH="100vh">
        <Container maxW="6xl">
          <DetailImageCard image={image} />
        </Container>
      </Flex>
    </>
  );
}

const DetailImageCard = ({ image }) => {
  const ownerFirstname = image.User ? image.User.firstname : "Unknown";
  const ownerLastname = image.User ? image.User.lastname : "Unknown";
  const categoryName =
    image.Categories && image.Categories.length > 0
      ? image.Categories[0].name
      : "Uncategorized";

  return (
    <>
      <Heading fontSize="xxx-large" mt={2} mb={2}>
        {image.title}
      </Heading>

      <Center>
        <Image src={image.image} width="6xl" />
      </Center>
      <Text>Description: "{image.description}"</Text>
      <Text>Date: {image.date}</Text>
      <Text>Location: {image.location}</Text>
      <Text>
        Owner: {ownerFirstname} {ownerLastname}
      </Text>
      <Text>Category: {categoryName}</Text>
    </>
  );
};
