import { Flex, Text, Spacer } from "@chakra-ui/react";
import { AddIcon, ChatIcon, SearchIcon } from "@chakra-ui/icons";

export default function NavBar() {
  return (
    <Flex bg="gray.600" w="100%" h="48px" align="center">
      <Text fontSize="xl">Simple tieba</Text>
      <Spacer />
      <AddIcon w={6} h={6} mx={2} />
      <ChatIcon w={6} h={6} mx={2} />
      <SearchIcon w={6} h={6} mx={2} />
    </Flex>
  );
}
