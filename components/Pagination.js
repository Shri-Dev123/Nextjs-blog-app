import Link from 'next/link'

const Pagination = ({ currentPage, totalPages, baseUrl }) => {
  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === totalPages

  return (
    <nav className="flex justify-center my-8">
      <ul className="flex">
        {!isFirstPage && (
          <li>
            <Link href={`${baseUrl}?page=${currentPage - 1}`}>
              <a className="block py-2 px-3 hover:bg-gray-200 rounded-l-md">
                Previous
              </a>
            </Link>
          </li>
        )}
        {Array.from({ length: totalPages }, (_, i) => (
          <li key={i}>
            <Link href={`${baseUrl}?page=${i + 1}`}>
              <a
                className={`block py-2 px-3 hover:bg-gray-200 ${
                  currentPage === i + 1
                    ? 'bg-gray-200 font-bold'
                    : 'text-blue-500'
                }`}
              >
                {i + 1}
              </a>
            </Link>
          </li>
        ))}
        {!isLastPage && (
          <li>
            <Link href={`${baseUrl}?page=${currentPage + 1}`}>
              <a className="block py-2 px-3 hover:bg-gray-200 rounded-r-md">
                Next
              </a>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Pagination
