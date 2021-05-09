import {
  Box,
  VStack,
  Flex,
  Heading,
  Text,
  StackDivider,
  Center,
} from "@chakra-ui/layout";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { format, isToday } from "date-fns";

export default function Home() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("/api/mock")
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setData(json.data);
      });
  }, []);

  const calcTime = (date) => {
    if (isToday(date)) {
      return format(date, "HH:mm")
    } else {
      return format(date, "MM-dd")
    }
  }

  return (
    <Center>
      <Head>
        <title>tieba</title>
        <meta name="description" content="simple tieba" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <VStack w="980px" divider={<StackDivider borderColor="gray.200" />} spacing={4}>
        {data.map((v, index) => (
          <Flex p={5} shadow="md" borderWidth="1px" w={960} key={index}>
            <Center w="50px" mr="4" bg="gray.200" borderRadius="10px" h="30px">
              {v.reply_cnt}
            </Center>
            <Flex direction="column" grow={1}>
              <Heading fontSize="2xl">{v.title}</Heading>
              <Text fontSize="md" color="gray.400" isTruncated maxWidth="600px">
                {v.content}
              </Text>
            </Flex>
            <Text>
              {calcTime(new Date(v.time))}
            </Text>
          </Flex>
        ))}
      </VStack>
    </Center>
  );
}
