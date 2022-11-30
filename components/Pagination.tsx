import { useCallback } from 'react';

const NFT_PAGE_ENTRIES_LENGTH = 10;

interface IPaginationProps {
  handleSearch: (page: number) => void;
  totalNFTs: number;
  page: number;
}

export default function Pagination({ handleSearch, totalNFTs, page }: IPaginationProps) {
  const handlePreviousClick = useCallback(() => {
    const newPage = Math.max(page - 1, 0);
    handleSearch(newPage);
  }, [handleSearch, page]);

  const handleNextClick = useCallback(() => {
    const newPage = Math.min(page + 1, Math.floor(totalNFTs / NFT_PAGE_ENTRIES_LENGTH));
    handleSearch(newPage);
  }, [handleSearch, page, totalNFTs]);

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center">
        <span className="text-sm text-gray-700 dark:text-gray-400">
          Showing{' '}
          <span className="font-semibold text-gray-900 dark:text-white">
            {(page * NFT_PAGE_ENTRIES_LENGTH) + 1}</span> to <span className="font-semibold text-gray-900 dark:text-white">
              {Math.min((page * NFT_PAGE_ENTRIES_LENGTH) + 10)}
            </span>
            {' '}of{' '}
            <span className="font-semibold text-gray-900 dark:text-white">{totalNFTs}</span>
            {' '}Entries
        </span>
        <div className="inline-flex mt-2 xs:mt-0">
          <button
            className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            onClick={handlePreviousClick}>
              Prev
          </button>
          <button
            className="px-4 py-2 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            onClick={handleNextClick}>
              Next
          </button>
        </div>
      </div>
    </div>
  )
}
