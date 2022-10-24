import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

export default function Layout({ title, children }) {
  return (
    <>
      <Head>
        <title>{title ? title + ' - Rachs Flowers' : 'Rachs Flowers'}</title>
        <meta name="description" content="Ecommerce flower website" />
        <link rel="icon" href="/" />
      </Head>
      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className="flex h-[48px] px-4 justify-between items-center shadow-lg font-primary bg-pink-500/50">
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
        <main className="container m-auto mt-3 px-3">{children}</main>
        <footer className="flex h-[40px] justify-center items-center shadown-inner">
          footer
        </footer>
      </div>
    </>
  );
}
