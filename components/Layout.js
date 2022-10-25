import Head from 'next/head';
import Link from 'next/link';
import React, { useContext } from 'react';
import { Store } from '../utils/Store';

export default function Layout({ title, children }) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  return (
    <>
      <Head>
        <title>{title ? title + ' - Rachs Flowers' : 'Rachs Flowers'}</title>
        <meta name="description" content="Ecommerce flower website" />
        <link rel="icon" href="/" />
      </Head>
      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className="flex h-[55px] px-4 justify-between items-center shadow-lg font-primary bg-pink-500/50">
            <Link href="/">
              <a className="text-lg font-semibold text-gray-100">
                Rach&apos;s Flowers{' '}
                <span className="bg-pink-400 rounded-full p-1">🌸</span>
              </a>
            </Link>
            <div>
              <Link href="/cart">
                <a className="p-[8px] text-gray-100 hover:bg-pink-400 rounded-full">
                  Cart 🛒
                  {cart.cartItems.length > 0 && (
                    <span className="ml-1 rounded-full bg-red-600 px-2  text-as font-bold text-white">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </span>
                  )}
                </a>
              </Link>
              <Link href="/login">
                <a className="p-[8px] text-gray-100 hover:bg-pink-400 rounded-full">
                  Login <span className="text-xl">⌨</span>
                </a>
              </Link>
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-6 px-3">{children}</main>
        <footer className="flex h-[40px] justify-center items-center shadown-inner">
          footer
        </footer>
      </div>
    </>
  );
}
