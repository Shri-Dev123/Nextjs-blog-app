const Post = require('../models/Post');

// Controller function to create a new blog post
exports.createPost = async (req, res) => {
  try {
    // Get the post title, content, and optional image URL from the request body
    const { title, content, imageUrl } = req.body;

    // Create a new post with the given title, content, and image URL
    const post = new Post({
      title,
      content,
      imageUrl,
      author: req.user._id // Use the currently logged-in user's ID as the post author
    });

    // Save the new post to the database
    await post.save();

    // Respond with the newly created post
    res.json(post);
  } catch (err) {
    // Handle any errors that occur
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Controller function to retrieve all blog posts (paginated)
exports.getPosts = async (req, res) => {
  try {
    // Parse the page and limit query parameters from the request URL
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Calculate the number of posts to skip based on the page and limit
    const skip = (page - 1) * limit;

    // Retrieve the requested page of posts from the database
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('author', 'username') // Populate the author field with just the username
      .exec();

    // Count the total number of posts in the database
    const count = await Post.countDocuments().exec();

    // Calculate the total number of pages based on the total post count and limit
    const totalPages = Math.ceil(count / limit);

    // Respond with the retrieved posts and pagination metadata
    res.json({ posts, totalPages });
  } catch (err) {
    // Handle any errors that occur
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Controller function to retrieve a single blog post by ID
exports.getPostById = async (req, res) => {
  try {
    // Retrieve the requested post by ID from the database
    const post = await Post.findById(req.params.id)
      .populate('author', 'username') // Populate the author field with just the username
      .exec();

    // If the post doesn't exist, respond with a 404 error
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Respond with the retrieved post
    res.json(post);
  } catch (err) {
    // Handle any errors that occur
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Controller function to update a blog post by ID
exports.updatePostById = async (req, res) => {
  try {
    // Retrieve the requested post by ID from the database
    const post = await Post.findById(req.params.id).exec();

    // If the post doesn't exist, respond with a 404 error
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
 // Respond with the retrieved post
 res.json(post);
} catch (err) {
  // Handle any errors that occur
  console.error(err);
  res.status(500).json({ message: 'Server Error' });
}
};

// delete a post by ID
exports.deletePostById = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
  
      // Check if post exists
      if (!post) {
        return res.status(404).json({ msg: "Post not found" });
      }
  
      // Check if user is authorized to delete post
      if (post.user.toString() !== req.user.id && req.user.role !== "admin") {
        return res.status(401).json({ msg: "User not authorized" });
      }
  
      await post.remove();
  
      res.json({ msg: "Post removed" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  };
  