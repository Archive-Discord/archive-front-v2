import Link from 'next/link'
const Paginator: React.FC<PaginatorProps> = ({ currentPage, totalPage, pathname, search }) => {
	let pages = []
	if (currentPage < 4)
		pages = [
			1,
			totalPage < 2 ? null : 2,
			totalPage < 3 ? null : 3,
			totalPage < 4 ? null : 4,
			totalPage < 5 ? null : 5,
		]
	else if (currentPage > totalPage - 3)
		pages = [
			totalPage - 4 < 1 ? null : totalPage - 4,
			totalPage - 3 < 1 ? null : totalPage - 3,
			totalPage - 2 < 1 ? null : totalPage - 2,
			totalPage - 1 < 1 ? null : totalPage - 1,
			totalPage,
		]
	else
		pages = [
			currentPage - 2 < 1 ? null : currentPage - 2,
			currentPage - 1 < 1 ? null : currentPage - 1,
			currentPage,
			currentPage + 1 > totalPage ? null : currentPage + 1,
			currentPage + 2 > totalPage ? null : currentPage + 2,
		]
	pages = pages.filter(el => el)
	return (
		<nav>
            <ul className="inline-flex">
                <Link href={{ pathname, query: { query: search, page: currentPage - 1 } }}>
					<a
						className={`${
							currentPage === 1 ? 'invisible' : ''
						} h-10 px-5 transition-colors duration-150 rounded-l-lg focus:shadow-outline hover:bg-gray-100 mr-2 flex items-center justify-center`}
					>
						<svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" fill-rule="evenodd"></path></svg>
					</a>
				</Link>
				{pages.map((el, i) => (
					<Link key={i} href={{ pathname, query: { query: search, page: el } }}>
						<a
							className={`w-12 flex justify-center items-center cursor-pointer leading-5 transition duration-150 ease-in ${
								i === 0 && i === pages.length - 1
									? 'rounded-full'
									: i === 0
										? 'rounded-l-full'
										: i === pages.length - 1
											? 'rounded-r-full'
											: ''
							} ${
								currentPage === el
									? 'h-10 px-5 transition-colors duration-150 bg-gray-100 focus:shadow-outline'
									: 'h-10 px-5 transition-colors duration-150 border border-r-0 focus:shadow-outline hover:bg-gray-100'
							}`}
						>
							{el}
						</a>
					</Link>
				))}
				<Link href={{ pathname, query: { query: search, page: currentPage + 1 } }}>
                <a
						className={`${
							currentPage === totalPage ? 'invisible' : ''
						} h-10 px-5 transition-colors duration-150 rounded-r-lg focus:shadow-outline hover:bg-gray-100 ml-2 flex items-center justify-center`}
					>
						<svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" fill-rule="evenodd"></path></svg>
					</a>
				</Link>
            </ul>
        </nav>
	)
}

interface PaginatorProps {
	pathname: string
	currentPage: number
	totalPage: number
	search?: string
}

export default Paginator