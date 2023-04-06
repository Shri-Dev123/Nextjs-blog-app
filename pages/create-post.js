import { useState } from 'react';
import Layout from '../components/Layout';
import CreatePostForm from '../components/CreatePostForm';
import { createPost } from '../controllers/PostController';
import { withAuth } from '../lib/auth';

function CreatePostPage() {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (formData) => {
    try {
      await createPost(formData);
      setSuccessMessage('Post created successfully!');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto my-8">
        <h1 className="text-3xl font-bold mb-4">Create a new post</h1>
        {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
        {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
        <CreatePostForm onSubmit={handleSubmit} />
      </div>
    </Layout>
  );
}

export default withAuth(CreatePostPage);
