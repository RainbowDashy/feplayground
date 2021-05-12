import { connectToDatabase } from "../../../utils/mongodb";

export default async (req, res) => {
  const { page } = req.query;
  const { db } = await connectToDatabase();
  const posts = await db
    .collection("posts")
    .find()
    .sort({ _id: -1 })
    .limit(10)
    .skip(10*page)
    .toArray();
  res.json(posts);
};
