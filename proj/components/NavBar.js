import { Flex, Text, Spacer, Link, Tooltip } from "@chakra-ui/react";
import { AddIcon, ChatIcon, InfoIcon, SearchIcon } from "@chakra-ui/icons";
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
      <Tooltip
        label="This is a frontend course project. A very simple tieba/reddit."
      >
        <InfoIcon w={6} h={6} mx={2} />
      </Tooltip>
    </Flex>
  );
}
