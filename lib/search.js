import { MongoClient } from "mongodb";

const searchPosts = async (query) => {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    const db = client.db(process.env.MONGODB_DB);
    const posts = db.collection("posts");

    const searchRegex = new RegExp(query, "i");

    const result = await posts
      .find({ $or: [{ title: searchRegex }, { content: searchRegex }] })
      .toArray();

    return result;
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
};

export default searchPosts;
