import React, { useContext, useEffect, useRef, useState } from "react";
import { Box, Flex, Heading, Image, Input, useToast } from "@chakra-ui/react";
import { CountryCard } from "../components/CountryCard";
import { DataContext } from "../context/DataContext";

const Home = () => {
  const [searchData, setSearchData] = useState("");
  const { dataList, setDataList, historyList, setHistoryList } = useContext(DataContext);
  const searchInputBox = useRef(null);
  const toast = useToast();

  useEffect(() => {
    searchInputBox.current.focus();
  }, []);

  const handleChange = (e) => {
    setSearchData(e.target.value);
  };

  const fetchCountryData = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Currency not found`);
      }
      const data = await response.json();
      toast({
        title: "Data fetched successfully",
        status: "success",
        duration: 4000,
        position: "top-right",
        isClosable: true,
      });
      setDataList(data);
    } catch (error) {
      toast({
        title: `${error.message}`,
        status: "error",
        duration: 4000,
        position: "top-right",
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    let id = null;
    if (searchData !== "") {
      id = setTimeout(() => {
        const newHistory = [...historyList];

        if (newHistory.length >= 5) {
          newHistory.pop();
        }
        newHistory.unshift(searchData);

        setHistoryList(newHistory);
        fetchCountryData(`https://restcountries.com/v3.1/currency/${searchData}`);
      }, 600);
    }
    return () => clearInterval(id);
  }, [searchData]);

  return (
    <>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection={"column"}
        mt={"80px"}
        bgGradient="linear(to-r, teal.500, green.500)"
        minH="100vh"
        py="20px"
        px="10px"
      >
        <Box w={{ base: "90%", md: "50%" }} mb="20px">
          <Input
            type="text"
            name="search"
            id="search"
            placeholder="Search..."
            ref={searchInputBox}
            value={searchData}
            onChange={handleChange}
            bg="white"
            borderRadius="md"
            shadow="md"
            _placeholder={{ color: "gray.500" }}
          />
        </Box>
        {dataList.length === 0 ? (
          <Flex
            align={"center"}
            direction={"column"}
            justifyContent={"center"}
            mt={"20px"}
            bg="white"
            p="20px"
            borderRadius="lg"
            shadow="lg"
          >
            <Heading mb={"8px"} color="teal.700">
              Welcome to Countries of World App
            </Heading>
            <Image
              src="https://static.vecteezy.com/system/resources/previews/002/189/427/large_2x/a-hand-using-a-laptop-computer-searching-for-information-in-the-internet-with-a-search-box-icon-free-photo.jpg"
              alt="Search Image"
              height={"400px"}
              borderRadius="md"
              shadow="md"
            />
          </Flex>
        ) : (
          <Flex
            wrap={"wrap"}
            gap={"20px"}
            mt={"20px"}
            p={{ base: "10px", md: "50px" }}
            bg="white"
            borderRadius="lg"
            shadow="lg"
          >
            {dataList &&
              dataList.length > 0 &&
              dataList.map((item, index) => {
                return <CountryCard key={index} item={item} />;
              })}
          </Flex>
        )}
      </Box>
    </>
  );
};

export { Home };
