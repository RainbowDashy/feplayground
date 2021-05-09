import {
  Box,
  VStack,
  Flex,
  Heading,
  Text,
  StackDivider,
  Center,
  Avatar,
  Tooltip,
  Link,
} from "@chakra-ui/react";
import Head from "next/head";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { format, isToday } from "date-fns";

export default function PostList() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("/api/mock")
      .then((res) => res.json())
      .then((json) => {
        console.log(json.data);
        setData(json.data);
      });
  }, []);

  const calcTime = (date) => {
    if (isToday(date)) {
      return format(date, "HH:mm");
    } else {
      return format(date, "MM-dd");
    }
  };

  return (
    <VStack
      w="980px"
      divider={<StackDivider borderColor="gray.200" />}
      spacing={4}
    >
      {data.map((v, index) => (
        <Flex p={5} shadow="md" borderWidth="1px" w={960} key={index}>
          <Tooltip label="reply">
            <Center w="50px" mr="4" bg="gray.200" borderRadius="10px" h="30px">
              {v.reply_cnt}
            </Center>
          </Tooltip>
          <Flex direction="column" grow={1}>
            <Link as={NextLink} href={`/post/${v.pid}`}>
              <Heading fontSize="2xl">{v.title}</Heading>
            </Link>
            <Text fontSize="md" color="gray.400" isTruncated maxWidth="600px">
              {v.content}
            </Text>
          </Flex>
          <Flex align="flex-end">
            <Avatar name={v.user} size="xs" />
            <Text ml="8px">
              <Tooltip label="last replied">
                {calcTime(new Date(v.time))}
              </Tooltip>
            </Text>
          </Flex>
        </Flex>
      ))}
    </VStack>
  );
}
