import Layout from '../components/Layout';
import Post from '../components/Post';
import Pagination from '../components/Pagination';
import { getPaginatedPosts } from '../lib/post';
import { useState } from 'react';

export default function Home({ posts, numPages }) {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Layout>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to My Blog</h1>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {posts.map((post) => (
            <Post key={post.slug} post={post} />
          ))}
        </div>
        <Pagination currentPage={currentPage} numPages={numPages} onPageChange={handlePageChange} />
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  const pageNum = parseInt(page);
  const { posts, numPages } = await getPaginatedPosts(pageNum);

  return {
    props: {
      posts,
      numPages,
    },
  };
}
