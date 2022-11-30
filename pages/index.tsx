import Head from 'next/head'
import styles from '../styles/Home.module.css'
import axios from 'axios';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { NFT } from '@prisma/client';

export default function Home() {
  const [nfts, setNFTS] = useState<NFT[]>([]);
  const [filters, setFilters] = useState<{ owner: string, address: string }>({ owner: '', address: '' });

  const handleFilterUpdate = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [event.target.id]: event.target.value})
  }, [filters]);

  const getNFTRequestUrl = useCallback(() => {
    const nFTrequestUrl = new URL(`${window.location.href}api/nfts`);
    if (filters.owner) {
      nFTrequestUrl.searchParams.append('owner', filters.owner);
    }
    if (filters.address) {
      nFTrequestUrl.searchParams.append('address', filters.address);
    }

    return nFTrequestUrl;
  }, [filters]);

  const handleSearch = useCallback((searchURL: URL) => {
    axios.get(searchURL.toString()).then((response) => {
      setNFTS(response.data.nfts);
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
            onClick={() => { handleSearch(getNFTRequestUrl())}}>
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
      </main>
    </div>
  )
}
