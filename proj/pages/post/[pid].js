import {
  Avatar,
  Center,
  Flex,
  StackDivider,
  VStack,
  Text,
  Box,
  Spacer,
} from "@chakra-ui/react";
import { AddIcon, ChatIcon, SearchIcon } from "@chakra-ui/icons";

import { format } from "date-fns";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar"


export default function Post() {
  const router = useRouter();
  const { pid } = router.query;
  const [data, setData] = useState({});

  useEffect(() => {
    fetch(`/api/mock/${pid}`)
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        console.log(res);
      });
  }, []);

  return (
    <Box bg="gray.100">
      <NavBar />
      <Center>
        <Head>
          <title>{data.title}</title>
          <meta name="description" content="simple tieba" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <VStack w="980px" spacing={6}>
          {data.data &&
            data.data.map((v, index) => (
              <Flex
                p={5}
                shadow="md"
                borderWidth="1px"
                w={960}
                key={index}
                direction="column"
                bg="white"
              >
                <Flex>
                  <Flex direction="column" align="center" mr={4}>
                    <Avatar name={v.user} />
                    <Text>{v.user}</Text>
                  </Flex>
                  <Text flexGrow={1} maxWidth="860px">
                    {v.content}
                  </Text>
                </Flex>
                <Flex justify="flex-end">
                  <Text fontSize="sm" color="gray.400">
                    {format(new Date(v.time), "yyyy-MM-dd HH:mm")}
                  </Text>
                  <Text ml={2}>#{index + 1}</Text>
                </Flex>
              </Flex>
            ))}
        </VStack>
      </Center>
    </Box>
  );
}