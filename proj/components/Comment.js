import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { HStack, VStack } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Comment(props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  function handleTitle(e) {
    setTitle(e.target.value);
  }

  function handleContent(e) {
    setContent(e.target.value);
  }

  function handleName(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    if (router.asPath === "/") {
      let data = {
        reply_cnt: 0,
        title: title,
        content,
        user: name,
        time: new Date().toJSON(),
      };
      fetch("/api/newpost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } else {
      let { pid } = router.query;
      let data = {
        _id: Number(pid),
        content,
        user: name,
        time: new Date().toJSON(),
      };
      fetch("/api/newreply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    }
    setTitle("");
    setContent("");
    setName("");
    if (props.onComment) {
      props.onComment();
    }
  }

  return (
    <VStack
      w="960px"
      direction="column"
      bg="white"
      p={2}
      shadow="md"
      borderWidth="1px"
    >
      {props.hasTitle && (
        <Input placeholder="Title" value={title} onChange={handleTitle}></Input>
      )}
      <Textarea value={content} onChange={handleContent}></Textarea>
      <HStack align="flex-start">
        <Input
          placeholder="Your name"
          value={name}
          onChange={handleName}
        ></Input>
        <Button onClick={handleSubmit}>Submit</Button>
      </HStack>
    </VStack>
  );
}
