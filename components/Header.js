import Link from 'next/link'

const Header = ({ user }) => {
  return (
    <header className="flex items-center justify-between py-4">
      <nav className="flex items-center justify-between flex-wrap">
        <Link href="/">
          <a className="font-bold text-xl tracking-tight">My Blog</a>
        </Link>
        <ul className="flex items-center flex-shrink-0 ml-6">
          <li>
            <Link href="/">
              <a className="block mt-4 lg:inline-block lg:mt-0 text-blue-500 hover:text-blue-700 mr-4">
                Home
              </a>
            </Link>
          </li>
          <li>
            <Link href="/posts/new">
              <a className="block mt-4 lg:inline-block lg:mt-0 text-blue-500 hover:text-blue-700 mr-4">
                Create Post
              </a>
            </Link>
          </li>
        </ul>
      </nav>
      <div>
        {user ? (
          <div className="flex items-center">
            <p className="mr-4">{`Welcome, ${user.name}!`}</p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Logout
            </button>
          </div>
        ) : (
          <Link href="/login">
            <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Login
            </a>
          </Link>
        )}
      </div>
    </header>
  )
}

export default Header
