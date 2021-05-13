import { connectToDatabase } from "../utils/mongodb";
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
  useToast,
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
import useSWR, { mutate, useSWRInfinite } from "swr";
import fetcher from "../utils/fetcher";
import { InView } from "react-intersection-observer";

const getKey = (pageIndex, previousPageData) => {
  if (previousPageData && !previousPageData.hasMore) return null;
  return `/api/posts/${pageIndex}`;
};

export default function Home({ posts }) {
  const { data, mutate, size, setSize } = useSWRInfinite(getKey, fetcher, {
    initialData: [{ posts, hasMore: true }],
    revalidateOnMount: true,
  });
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd = isEmpty || (data && !data[data.length - 1]?.hasMore);

  const toast = useToast();

  return (
    <Center bg="gray.100" flexDirection="column">
      <Head>
        <title>tieba</title>
        <meta name="description" content="simple tieba" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <Accordion allowToggle w="960px" my={4} defaultIndex={0}>
        <AccordionItem>
          <AccordionButton>
            <Text>New post</Text>
            <Spacer />
            <AccordionIcon />
          </AccordionButton>

          <AccordionPanel px={0}>
            <Comment
              hasTitle
              onComment={() => {
                toast({
                  title: "Successfully post.",
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                });
                mutate(data, false);
                mutate();
                console.log(mutate);
                // ref https://github.com/vercel/swr/issues/908
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

export async function getServerSideProps() {
  const { db } = await connectToDatabase();
  const posts = await db.collection("posts").find().sort({"_id": -1}).limit(10).skip(0).toArray();
  return { props: { posts } };
}