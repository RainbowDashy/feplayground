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
} from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { format, isToday } from "date-fns";
import PostList from "../components/PostList";
import PostListSkeleton from "../components/PostListSkeleton";
import NavBar from "../components/NavBar";
import Comment from "../components/Comment";
import useSWR from "swr";
import fetcher from "../utils/fetcher";

export default function Home({ posts }) {
  const { data, mutate } = useSWR("/api/posts", fetcher, {
    initialData: posts,
  });

  return (
    <Center bg="gray.100" flexDirection="column">
      <Head>
        <title>tieba</title>
        <meta name="description" content="simple tieba" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      {data ? <PostList posts={data} /> : <PostListSkeleton />}

      <Comment hasTitle onComment={mutate} />
      <Button onClick={mutate}>click</Button>
    </Center>
  );
}

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/posts");
  const posts = await res.json();
  return { props: { posts } };
}
