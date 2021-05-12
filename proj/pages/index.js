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
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Spacer,
  Divider,
} from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import NextLink from "next/link";
import { Fragment, useEffect, useState } from "react";
import { format, isToday } from "date-fns";
import PostList from "../components/PostList";
import PostListSkeleton from "../components/PostListSkeleton";
import NavBar from "../components/NavBar";
import Comment from "../components/Comment";
import NoMore from "../components/NoMore";
import useSWR, { useSWRInfinite } from "swr";
import fetcher from "../utils/fetcher";
import { InView } from "react-intersection-observer";

const getKey = (pageIndex, previousPageData) => {
  if (previousPageData && !previousPageData.hasMore) return null;
  return `/api/posts/${pageIndex}`;
};

export default function Home({ posts }) {
  const { data, size, setSize } = useSWRInfinite(getKey, fetcher);
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd = isEmpty || (data && !data[data.length - 1]?.hasMore);
  return (
    <Center bg="gray.100" flexDirection="column">
      <Head>
        <title>tieba</title>
        <meta name="description" content="simple tieba" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <Accordion allowToggle w="960px" my={4}>
        <AccordionItem>
          <AccordionButton>
            <Text>New post</Text>
            <Spacer />
            <AccordionIcon />
          </AccordionButton>

          <AccordionPanel px={0}>
            <Comment
              hasTitle
              onCommentUpdate={(newData) => {
                console.log(data);
                console.log("new data", newData);
                console.log("concat", [newData, ...data]);
                // console.log(mutate([newData, ...data], false));
                console.log(mutate([]));
                console.log(data);
              }}
            />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      {data &&
        data.map((posts, index) => {
          return (
            <Fragment key={index}>
              <PostList posts={posts.posts} />
              <Divider my={10} />
            </Fragment>
          );
        })}

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
  );
}

// export async function getServerSideProps() {
//   const res = await fetch("http://localhost:3000/api/posts");
//   const posts = await res.json();
//   return { props: { posts } };
// }
