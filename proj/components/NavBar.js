import { Flex, Text, Spacer, Link } from "@chakra-ui/react";
import { AddIcon, ChatIcon, SearchIcon } from "@chakra-ui/icons";
import NextLink from "next/link";

export default function NavBar() {
  return (
    <Flex bg="gray.50" w="100%" h="48px" align="center">
      <Link>
        <NextLink href="/">
          <Text fontSize="xl">Simple tieba</Text>
        </NextLink>
      </Link>
      <Spacer />
      <AddIcon w={6} h={6} mx={2} />
      <ChatIcon w={6} h={6} mx={2} />
      <SearchIcon w={6} h={6} mx={2} />
    </Flex>
  );
}
