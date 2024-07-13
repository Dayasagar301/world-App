import { Box, Button, Image, Text, VStack, useColorModeValue, IconButton, Tooltip } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";

function CountryCard({ item }) {
  const filteredCountry = {
    name: item.name.common,
    currency: Object.values(item.currencies)
      .map((c) => c.name)
      .join(", "),
    capital: item.capital ? item.capital[0] : "Capital detail not available",
    languages: item.languages
      ? Object.values(item.languages).join(", ")
      : "languages not available",
    flag: `https://flagsapi.com/${item.cca2}/flat/64.png`,
  };

  const { favoriteList, setFavoriteList } = useContext(DataContext);

  const handleClick = (item) => {
    setFavoriteList([...favoriteList, item]);
  };

  const bg = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p="6"
      w="300px"
      bg={bg}
      borderColor={borderColor}
      boxShadow="lg"
      transition="all 0.3s"
      _hover={{ transform: "scale(1.05)", boxShadow: "xl" }}
    >
      <VStack spacing={4}>
        <Image
          src={filteredCountry.flag}
          alt={`Flag of ${filteredCountry.name}`}
          borderRadius="md"
          boxShadow="md"
        />
        <Text fontSize="2xl" fontWeight="bold" textAlign="center">
          {filteredCountry.name}
        </Text>
        <Text fontSize="md" textAlign="center">
          <strong>Currency:</strong> {filteredCountry.currency}
        </Text>
        <Text fontSize="md" textAlign="center">
          <strong>Capital:</strong> {filteredCountry.capital}
        </Text>
        <Text fontSize="md" textAlign="center">
          <strong>Languages:</strong> {filteredCountry.languages}
        </Text>
        <Tooltip label="Add to Favorites" aria-label="Add to Favorites">
          <IconButton
            icon={<StarIcon />}
            colorScheme="teal"
            variant="outline"
            onClick={() => handleClick(item)}
          />
        </Tooltip>
      </VStack>
    </Box>
  );
}

export { CountryCard };
