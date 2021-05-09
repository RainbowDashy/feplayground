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
import Image from "next/image";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { format, isToday } from "date-fns";
import PostList from "../components/PostList";
import NavBar from "../components/NavBar";
import useSWR from "swr";
import fetcher from "../utils/fetcher"
export default function Home({ posts }) {
  const { data } = useSWR("/api/mock", fetcher, {
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
      <PostList posts={data.data} />
    </Center>
  );
}

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/mock");
  const posts = await res.json();
  return { props: { posts } };
}
