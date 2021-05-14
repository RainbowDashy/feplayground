import {
  VStack,
  Flex,
  StackDivider,
  Skeleton,
  SkeletonCircle,
} from "@chakra-ui/react";
import { range } from "lodash";

export default function PostListSkeleton() {
  return (
    <VStack
      w="980px"
      divider={<StackDivider borderColor="gray.200" />}
      spacing={4}
    >
      {range(10).map((_, index) => (
        <Flex
          bg="white"
          p={5}
          shadow="md"
          borderWidth="1px"
          w="960px"
          key={index}
          direction="column"
        >
          <Flex direction="column">
            <Skeleton h="80px" w="100%" />
          </Flex>

          <Flex justify="flex-end" mt={4}>
            <SkeletonCircle />
          </Flex>
        </Flex>
      ))}
    </VStack>
  );
}
