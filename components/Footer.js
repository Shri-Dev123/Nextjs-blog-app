import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-200 p-4">
      <div className="container mx-auto text-center">
        <Link href="/">
          <a className="text-gray-600 hover:text-gray-800 mr-5">Home</a>
        </Link>
        <Link href="/create-post">
          <a className="text-gray-600 hover:text-gray-800 mr-5">Create Post</a>
        </Link>
        <Link href="/login">
          <a className="text-gray-600 hover:text-gray-800 mr-5">Login</a>
        </Link>
        <Link href="/logout">
          <a className="text-gray-600 hover:text-gray-800 mr-5">Logout</a>
        </Link>
        <Link href="/profile">
          <a className="text-gray-600 hover:text-gray-800 mr-5">Profile</a>
        </Link>
        <Link href="/about">
          <a className="text-gray-600 hover:text-gray-800">About</a>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
