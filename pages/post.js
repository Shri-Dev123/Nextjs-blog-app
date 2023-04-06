import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Post from "../components/Post";
import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";
import { getPostById } from "../controllers/PostController";

export default function PostPage() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const postData = await getPostById(id);
      setPost(postData);
    };
    fetchData();
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <Post post={post} />
      <CommentList comments={post.comments} />
      <CommentForm postId={post._id} />
    </Layout>
  );
}
