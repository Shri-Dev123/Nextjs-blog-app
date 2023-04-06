import Link from 'next/link'

const Post = ({ post }) => {
  const { title, excerpt, slug } = post

  return (
    <article className="mb-6">
      <h2 className="text-2xl font-bold mb-2">
        <Link href={`/posts/${slug}`}>
          <a className="hover:text-blue-500">{title}</a>
        </Link>
      </h2>
      <p className="text-gray-700 mb-4">{excerpt}</p>
      <Link href={`/posts/${slug}`}>
        <a className="text-blue-500 hover:text-blue-700">Read more</a>
      </Link>
    </article>
  )
}

export default Post
