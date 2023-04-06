import { useState } from 'react';
import Comment from '../models/Comment';

const CommentList = ({ comments }) => {
  const [sortBy, setSortBy] = useState('latest');

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const sortedComments =
    sortBy === 'latest'
      ? [...comments].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      : [...comments].sort((a, b) => a.likes.length - b.likes.length);

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{comments.length} Comments</h2>
        <div className="flex items-center space-x-2">
          <label htmlFor="sort" className="text-sm font-medium text-gray-700">
            Sort By:
          </label>
          <select
            id="sort"
            className="px-2 py-1 rounded border border-gray-300"
            value={sortBy}
            onChange={handleSortChange}
          >
            <option value="latest">Latest</option>
            <option value="popular">Popular</option>
          </select>
        </div>
      </div>
      {sortedComments.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;
