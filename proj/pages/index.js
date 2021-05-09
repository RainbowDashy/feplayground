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
import NavBar from "../components/NavBar"

export default function Home() {
  return (
    <Center bg="gray.100" flexDirection="column">
      <Head>
        <title>tieba</title>
        <meta name="description" content="simple tieba" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <PostList />
    </Center>
  );
}
