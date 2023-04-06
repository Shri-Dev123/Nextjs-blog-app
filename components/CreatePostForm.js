import React, { useState } from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const CreatePostForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: event.target.files[0],
    }));
  };

  const handleContentChange = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      content: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="content">Content</label>
        <ReactQuill value={formData.content} onChange={handleContentChange} />
      </div>
      <div>
        <label htmlFor="image">Image</label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none
          focus:shadow-outline`}
        >
          Create Post
        </button>
      </div>
    </form>
  );
};

export default CreatePostForm;
