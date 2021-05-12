import { connectToDatabase } from "../../../utils/mongodb";

export default async (req, res) => {
  let { pid, page } = req.query;
  if (page === undefined) page = 0;
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
    .project({ reply: { $slice: [page * 10, 10] } })
    .toArray();
  let data = { ...post[0], hasMore: page * 10 + 10 < count };
  res.json(data);
};
