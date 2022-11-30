import Head from 'next/head'
import styles from '../styles/Home.module.css'
import axios from 'axios';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { NFT } from '@prisma/client';

const NFT_PAGE_ENTRIES_LENGTH = 10;

export default function Home() {
  const [nfts, setNFTS] = useState<NFT[]>([]);
  const [totalNFTs, setTotalNFTs] = useState<number>(0);
  const [filters, setFilters] = useState<{ owner: string, address: string }>({ owner: '', address: '' });
  const [page, setPage] = useState<number>(0);

  const handleFilterUpdate = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [event.target.id]: event.target.value})
  }, [filters]);

  const getNFTRequestUrl = useCallback((page: number) => {
    const nFTrequestUrl = new URL(`${window.location.href}api/nfts`);
    if (filters.owner) {
      nFTrequestUrl.searchParams.append('owner', filters.owner);
    }
    if (filters.address) {
      nFTrequestUrl.searchParams.append('address', filters.address);
    }
    nFTrequestUrl.searchParams.append('page', String(page));

    return nFTrequestUrl;
  }, [filters]);

  const handleSearch = useCallback((searchURL: URL) => {
    axios.get(searchURL.toString()).then((response) => {
      setNFTS(response.data.nfts);
      setTotalNFTs(response.data.total);
    });
  }, []);

  useEffect(() => {
    handleSearch(new URL(`${window.location.href}api/nfts`));
  }, [handleSearch]);

  return (
    <div className={styles.container}>
      <Head>
        <title>NFTs By Satsuma</title>
        <meta name="description" content="NFTs By Satsuma" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className="text-3xl font-bold underline pt-20 text-center">
          Welcome to the NFT Database
        </h1>

        <div className="py-10 px-20">
        <div className="mb-4">
          <div className="flex">
            <label className="text-blue-400 text-sm font-bold m-2">
              Owner address
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id="owner"
                onChange={handleFilterUpdate} />
            </label>
            <label className="text-blue-400 text-sm font-bold m-2">
              NFT Address
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                id="address"
                type="text"
                onChange={handleFilterUpdate} />
            </label>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 m-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => {
              setPage(0);
              handleSearch(getNFTRequestUrl(0));
            }}>
            Search
          </button>
        </div>
        {
          nfts.length === 0
            ? <div>No NFTs Found with those search conditions</div>
            : (
              <div>
                <h2 className="p-2">{nfts.length} NFTs Found</h2>
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-2">Address</div>
                  <div className="p-2">Owner</div>
                  <div className="p-2">Price</div>
                </div>
                {
                  nfts.map((nft) => {
                    return (
                      <div key="nft.address" className="grid grid-cols-3 gap-4">
                        <div className="p-2">{nft.address}</div>
                        <div className="p-2">{nft.owner}</div>
                        <div className="p-2">{nft.priceEth}</div>
                      </div>
                    )
                  })
                }
              </div>
            )
        }
        </div>
        <div className="flex justify-center">
          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-700 dark:text-gray-400">
              Showing <span className="font-semibold text-gray-900 dark:text-white">{(page * NFT_PAGE_ENTRIES_LENGTH) + 1}</span> to <span className="font-semibold text-gray-900 dark:text-white">{Math.min((page * NFT_PAGE_ENTRIES_LENGTH) + 10, totalNFTs)}</span> of <span className="font-semibold text-gray-900 dark:text-white">{totalNFTs}</span> Entries
            </span>
            <div className="inline-flex mt-2 xs:mt-0">
              <button
                className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                onClick={() => {
                  const newPage = Math.max(page - 1, 0);
                  setPage(newPage);
                  handleSearch(getNFTRequestUrl(newPage));
                }}>
                  Prev
              </button>
              <button
                className="px-4 py-2 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                onClick={() => {
                  const newPage = Math.min(page + 1, Math.floor(totalNFTs / NFT_PAGE_ENTRIES_LENGTH));
                  setPage(newPage);
                  handleSearch(getNFTRequestUrl(newPage));
                }}>
                  Next
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
