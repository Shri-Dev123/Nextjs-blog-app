const { MongoClient, ObjectId } = require('mongodb');

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

async function connectToDatabase() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  const db = client.db(dbName);
  return { db, client };
}

async function getPosts(pageNumber, pageSize, searchText) {
  const { db, client } = await connectToDatabase();
  const posts = db.collection('posts');
  const query = {};

  if (searchText) {
    query.$or = [
      { title: { $regex: searchText, $options: 'i' } },
      { content: { $regex: searchText, $options: 'i' } },
    ];
  }

  const count = await posts.countDocuments(query);
  const totalPages = Math.ceil(count / pageSize);

  const result = await posts
    .find(query)
    .sort({ createdAt: -1 })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .toArray();

  client.close();

  return {
    data: result,
    meta: {
      count,
      totalPages,
      pageNumber,
      pageSize,
    },
  };
}

async function getPostById(id) {
  const { db, client } = await connectToDatabase();
  const posts = db.collection('posts');
  const result = await posts.findOne({ _id: ObjectId(id) });
  client.close();
  return result;
}

async function createPost(post) {
  const { db, client } = await connectToDatabase();
  const posts = db.collection('posts');
  const result = await posts.insertOne(post);
  client.close();
  return result.insertedId;
}

async function updatePost(id, post) {
  const { db, client } = await connectToDatabase();
  const posts = db.collection('posts');
  const result = await posts.updateOne({ _id: ObjectId(id) }, { $set: post });
  client.close();
  return result.modifiedCount;
}

async function deletePostById(id) {
  const { db, client } = await connectToDatabase();
  const posts = db.collection('posts');
  const result = await posts.deleteOne({ _id: ObjectId(id) });
  client.close();
  return result.deletedCount;
}

module.exports = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePostById,
};
