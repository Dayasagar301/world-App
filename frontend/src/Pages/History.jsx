import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { Box, Heading,Text } from "@chakra-ui/react";


const History = () => {
  const { historyList } = useContext(DataContext);
  return (
    <Box mt={"80px"} textAlign={"center"}>
      <Heading>History</Heading>
      {historyList.map((item, index) => {
        return <Text key={index}>{item}</Text>;
      })}
    </Box>
  );
};

export { History };
