import { connectToDatabase } from "../../../utils/mongodb";

export default async (req, res) => {
  const { pid } = req.query;
  const { db } = await connectToDatabase();
  const post = await db.collection("post").findOne({_id: Number(pid)});
  res.json(post);
};
