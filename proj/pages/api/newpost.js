import { connectToDatabase } from "../../utils/mongodb";

export default async (req, res) => {
  if (req.method === "POST") {
    const { db } = await connectToDatabase();
    const count = await db.collection("post_count").findOne();

    await db.collection("posts").insert({ _id: count.count + 1, ...req.body });
    await db
      .collection("post")
      .insert({
        _id: count.count + 1,
        title: req.body.title,
        reply: [
          {
            content: req.body.content,
            time: req.body.time,
            user: req.body.user,
          },
        ],
      });
    res.json({ ...req.body, count: count });
    await db
      .collection("post_count")
      .updateOne({}, { $set: { count: count.count + 1 } });
  }
};
