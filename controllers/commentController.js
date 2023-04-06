const Comment = require('../models/Comment');

// Controller function to create a new comment
exports.createComment = async (req, res) => {
  try {
    // Get the blog post ID and comment body from the request body
    const { postId, body } = req.body;

    // Create a new comment with the given body and post ID
    const comment = new Comment({
      body,
      post: postId,
      user: req.user._id // Use the currently logged-in user's ID as the commenter
    });

    // Save the new comment to the database
    await comment.save();

    // Respond with the newly created comment
    res.json(comment);
  } catch (err) {
    // Handle any errors that occur
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};
