import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

export const getAllPosts = async () => {
  try {
    const response = await apiClient.get('/posts');
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getPostById = async (postId) => {
  try {
    const response = await apiClient.get(`/posts/${postId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createPost = async (postData) => {
  try {
    const response = await apiClient.post('/posts', postData);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deletePostById = async (postId) => {
  try {
    const response = await apiClient.delete(`/posts/${postId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getPaginatedPosts = async (page = 1, limit = 10) => {
  try {
    const response = await apiClient.get(`/posts?_page=${page}&_limit=${limit}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
