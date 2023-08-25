"use client";

// import { ImageCard } from "@/components";
// import { Container, Box, Heading, Text, Wrap, Grid } from "@chakra-ui/react";
// import { useEffect, useState } from "react";

// export default function Galery() {

//   return (
//     <Container maxW="6xl">
//       <Heading fontSize="9xl" mb={5}>
//         galery.
//       </Heading>
//       <Text fontSize="4xl">
//         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi.
//         In sagittis nisi vitae sem lacinia, at cursus neque ultrices.
//       </Text>
//       <Grid templateColumns="repeat(3, 1fr)" gap={6} mt={5}>
//         {images.map((image, idx) => (
//           <ImageCard key={idx} {...image} />
//         ))}
//       </Grid>
//     </Container>
//   );
// }

import React from "react";
import {
  Button,
  Container,
  Box,
  Text,
  Heading,
  Wrap,
  Stack,
} from "@chakra-ui/react";
import { fetchImage } from "@/fetching/fetchData";
import { useState, useEffect } from "react";
import { ImageCard } from "@/components";

function Galery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const images = await fetchImage();
      setImages(images);
    };
    fetchImages();
  }, []);

  return (
    <div>
      <Container maxW="6xl" minH="100vh" mt={20}>
        <Box>
          <Heading fontSize="9xl" mb={5}>
            galery.
          </Heading>
          <Text fontSize="4xl" mb={5}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            facilisi. In sagittis nisi vitae sem lacinia, at cursus neque
            ultrices.
          </Text>
        </Box>
        <Box>
          <Wrap justify="space-evenly">
            {images.map((image, idx) => (
              <ImageCard key={idx} {...image} />
            ))}
          </Wrap>
        </Box>
      </Container>
    </div>
  );
}

export default Galery;
