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

  const bg = useColorModeValue("teal.500", "gray.700");
  const borderColor = useColorModeValue("teal.700", "gray.600");
  const textColor = useColorModeValue("white", "gray.100");

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p="6"
      w="300px"
      bg={bg}
      borderColor={borderColor}
      boxShadow="2xl"
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
        <Text fontSize="2xl" fontWeight="bold" textAlign="center" color={textColor}>
          {filteredCountry.name}
        </Text>
        <Text fontSize="md" textAlign="center" color={textColor}>
          <strong>Currency:</strong> {filteredCountry.currency}
        </Text>
        <Text fontSize="md" textAlign="center" color={textColor}>
          <strong>Capital:</strong> {filteredCountry.capital}
        </Text>
        <Text fontSize="md" textAlign="center" color={textColor}>
          <strong>Languages:</strong> {filteredCountry.languages}
        </Text>
        <Tooltip label="Add to Favorites" aria-label="Add to Favorites">
          <IconButton
            icon={<StarIcon />}
            colorScheme="yellow"
            variant="solid"
            onClick={() => handleClick(item)}
            _hover={{ color: "white", bg: "yellow.500" }}
          />
        </Tooltip>
      </VStack>
    </Box>
  );
}

export { CountryCard };
