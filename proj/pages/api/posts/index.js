import { connectToDatabase } from "../../../utils/mongodb";

export default async (req, res) => {
  console.log(req.body)
  const { db } = await connectToDatabase();
  const posts = await db.collection("posts").find().sort({"_id": -1}).limit(10).skip(0).toArray();
  res.json(posts);
};
