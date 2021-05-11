const rep = {
  data: [
    {
      "reply_cnt": 100,
      "title": "hello world",
      "content": "hello world hello world",
      "time": "2021-05-07T06:00:01.885Z",
      "user": "p0ny",
      "pid": 1,
    },
    {
      reply_cnt: "100",
      title: "hello world",
      content: "hello world hello world",
      time: "2021-05-08T03:00:01.885Z",
      user: "p0ny",
      pid: 2,
    },
    {
      reply_cnt: "100",
      title: "hello world",
      content: "hello world hello world",
      time: "2021-05-09T04:00:01.885Z",
      user: "p0ny",
      pid: 3,
    },
    {
      reply_cnt: "100",
      title: "hello world",
      content: "hello world hello worlddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",
      time: "2021-05-09T03:00:01.885Z",
      user: "p0ny",
      pid: 4,
    },
    {
      reply_cnt: "100",
      title: "hello world",
      content: "hello world hello world",
      time: "2021-05-09T03:00:01.885Z",
      user: "p0ny",
      pid: 5,
    },
    {
      reply_cnt: "100",
      title: "hello world",
      content: "hello world hello world",
      time: "2021-05-09T07:00:01.885Z",
      user: "p0ny",
      pid: 6,
    },
    {
      reply_cnt: "100",
      title: "hello world",
      content: "hello world hello world",
      time: "2021-05-09T03:00:01.885Z",
      user: "p0ny",
      pid: 7,
    },
    {
      reply_cnt: "100",
      title: "hello world",
      content: "hello world hello world",
      time: "2021-05-09T03:00:01.885Z",
      user: "p0ny",
      pid: 8,
    },
    {
      reply_cnt: "100",
      title: "hello world",
      content: "hello world hello world",
      time: "2021-05-09T03:00:01.885Z",
      user: "p0ny",
      pid: 9,
    },
  ],
};

export default (req, res) => {
  res.status(200).json(rep);
};
