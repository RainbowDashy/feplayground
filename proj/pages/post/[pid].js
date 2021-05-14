import { connectToDatabase } from "../../utils/mongodb";
import {
  Avatar,
  Center,
  Flex,
  VStack,
  Text,
  Box,
  Divider,
  useToast,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  DrawerBody,
  Tooltip,
  DrawerHeader,
} from "@chakra-ui/react";

import { format } from "date-fns";
import Head from "next/head";
import { Fragment, useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import Comment from "../../components/Comment";
import fetcher from "../../utils/fetcher";
import { useSWRInfinite } from "swr";
import NoMore from "../../components/NoMore";
import PostListSkeleton from "../../components/PostListSkeleton";
import { InView } from "react-intersection-observer";
import { EditIcon } from "@chakra-ui/icons";

const getKey = (pid) => {
  return (pageIndex, previousPageData) => {
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

export default function Post({ pid, initData }) {
  const { data, mutate, size, setSize } = useSWRInfinite(getKey(pid), fetcher, {
    initialData: [initData],
    revalidateOnMount: true,
  });
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd = isEmpty || (data && !data[data.length - 1]?.hasMore);
  const [title, setTitle] = useState("");
  useEffect(() => {
    if (data) setTitle(data[0].title);
  }, [data]);

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg="gray.100">
      <NavBar />
      <Button onClick={onOpen} pos="sticky" top="90%" left="90%">
        <Tooltip label="Reply">
          <EditIcon h={6} w={6} />
        </Tooltip>
      </Button>
      <Center flexDirection="column">
        <Head>
          <title>{title}</title>
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

        <Drawer isOpen={isOpen} placement="bottom" onClose={onClose} size="lg">
          <DrawerOverlay />
          <DrawerContent align="center">
            <DrawerCloseButton />
            <DrawerHeader>
              Your reply
            </DrawerHeader>
            <DrawerBody>
              <Flex justify="center">
                <Comment
                  onComment={() => {
                    toast({
                      title: "Successfully replied.",
                      status: "success",
                      duration: 5000,
                      isClosable: true,
                    });
                    mutate(data, false);
                    mutate();
                    // ref https://github.com/vercel/swr/issues/908
                  }}
                />
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
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
  const { db } = await connectToDatabase();
  const reply_cnt = await db.collection("posts").findOne(
    { _id: Number(pid) },
    {
      projection: {
        reply_cnt: 1,
      },
    }
  );
  let count = reply_cnt.reply_cnt + 1;
  const post = await db
    .collection("post")
    .find({ _id: Number(pid) })
    .project({ reply: { $slice: [0, 10] } })
    .toArray();
  let data = { ...post[0], hasMore: 10 < count };
  return {
    props: {
      pid,
      initData: data,
    },
  };
}
