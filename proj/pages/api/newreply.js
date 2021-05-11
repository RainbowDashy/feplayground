import { connectToDatabase } from "../../utils/mongodb";

export default async (req, res) => {
  if (req.method === "POST") {
    const { db } = await connectToDatabase();
    await db.collection("posts").updateOne(
      {
        _id: req.body._id,
      },
      {
        $inc: { reply_cnt: 1 },
      }
    );
    await db.collection("post").updateOne(
      {
        _id: req.body._id,
      },
      {
        $push: {
          reply: {
            content: req.body.content,
            time: req.body.time,
            user: req.body.user,
          },
        },
      }
    );
    res.json(req.body);
  }
};
