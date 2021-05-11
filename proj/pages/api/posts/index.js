import { connectToDatabase } from "../../../utils/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const posts = await db.collection("posts").find().sort({"time": -1}).toArray();
  res.json(posts);
};
