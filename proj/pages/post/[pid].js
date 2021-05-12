import {
  Avatar,
  Center,
  Flex,
  StackDivider,
  VStack,
  Text,
  Box,
  Spacer,
  Button,
  Divider,
} from "@chakra-ui/react";

import { format } from "date-fns";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import Comment from "../../components/Comment";
import fetcher from "../../utils/fetcher";
import { useSWRInfinite } from "swr";
import NoMore from "../../components/NoMore";
import PostListSkeleton from "../../components/PostListSkeleton";
import { InView } from "react-intersection-observer";

const getKey = (pid) => {
  return (pageIndex, previousPageData) => {
    console.log(`pid=${pid}, page=${pageIndex}`);
    // console.log(previousPageData.hasMore)
    if (previousPageData && !previousPageData.hasMore) return null;

    return `/api/post/${pid}?page=${pageIndex}`;
  };
};

function Page(props) {
  return props.reply.map((v, index) => (
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
        <Text ml={2}>#{props.pageIndex * 10 + index + 1}</Text>
      </Flex>
    </Flex>
  ));
}

export default function Post({ pid }) {
  const { data, size, setSize } = useSWRInfinite(getKey(pid), fetcher);
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd = isEmpty || (data && !data[data.length - 1]?.hasMore);
  console.log(data);
  return (
    <Box bg="gray.100">
      <NavBar />
      <Center flexDirection="column">
        <Head>
          {/* <title>{data.title}</title> */}
          <meta name="description" content="simple tieba" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <VStack w="980px" spacing={6}>
          {data &&
            data.map((v, index) => (
              <Fragment key={index}>
                <Page reply={v.reply} pageIndex={index} />
                <Divider my={10} />
              </Fragment>
            ))}
        </VStack>
        <Comment />
        {isReachingEnd ? (
          <NoMore />
        ) : (
          <InView
            as="div"
            onChange={(inView) => {
              if (inView) setSize(size + 1);
            }}
          >
            <PostListSkeleton />
          </InView>
        )}
      </Center>
    </Box>
  );
}

export async function getServerSideProps(ctx) {
  const { pid } = ctx.query;
  return {
    props: {
      pid,
    },
  };
}
