import { connectToDatabase } from "../../../utils/mongodb";

export default async (req, res) => {
  const { page } = req.query;
  const { db } = await connectToDatabase();
  const posts = await db
    .collection("posts")
    .find()
    .sort({ _id: -1 })
    .limit(10)
    .skip(10 * page)
    .toArray();
  const count = await db.collection("post_count").findOne()
  let data = {posts, hasMore: 10 * page + 10 < count.count}
  res.json(data)
};
