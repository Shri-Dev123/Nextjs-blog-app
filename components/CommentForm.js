import { useState } from "react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";

const CommentForm = ({ postId }) => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      content: "",
    },
    validationSchema: Yup.object({
      content: Yup.string().required("Comment content is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setSubmitting(true);

      try {
        const res = await fetch("/api/comments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ postId, ...values }),
        });

        if (!res.ok) {
          throw new Error("Failed to create comment");
        }

        resetForm();
        router.reload();
      } catch (error) {
        console.error(error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mb-4">
        <label htmlFor="content" className="block text-gray-700 font-bold mb-2">
          Comment
        </label>
        <textarea
          id="content"
          name="content"
          rows="3"
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            formik.touched.content && formik.errors.content ? "border-red-500" : ""
          }`}
          value={formik.values.content}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.content && formik.errors.content ? (
          <p className="text-red-500 text-xs mt-1">{formik.errors.content}</p>
        ) : null}
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
            submitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
