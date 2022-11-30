import Head from 'next/head'
import styles from '../styles/Home.module.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { NFT } from '@prisma/client';

export default function Home() {
  const [nfts, setNFTS] = useState<NFT[]>([]);

  useEffect(() => {
    axios.get('/api/nfts?owner=234').then((response) => {
      setNFTS(response.data.nfts);
    });
  }, []);

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
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text" />
            </label>
            <label className="text-blue-400 text-sm font-bold m-2">
              NFT Address
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text" />
            </label>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 m-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button">
            Search
          </button>
        </div>
          <table className="border-collapse table-auto w-full">
            <thead>
              <tr className="text-left">
                <th className="p-2">Address</th>
                <th className="p-2">Owner</th>
                <th className="p-2">Price</th>
              </tr>
            </thead>
            <tbody>
              {
                nfts.map((nft) => {
                  return (
                    <tr key={nft.address}>
                      <td className="p-2">{nft.address}</td>
                      <td className="p-2">{nft.owner}</td>
                      <td className="p-2">{nft.priceEth}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
