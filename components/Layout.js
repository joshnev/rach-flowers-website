import Head from 'next/head';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Store } from '../utils/Store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalMenu from './ModalMenu';

export default function Layout({ title, children }) {
  const { status, data: session } = useSession();

  const { state } = useContext(Store);
  const { cart } = state;
  const [modalMenu, setModalMenu] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);
  return (
    <>
      <Head>
        <title>{title ? title + ' - Rachs Flowers' : 'Rachs Flowers'}</title>
        <meta name="description" content="Ecommerce flower website" />
        <link rel="icon" href="/" />
      </Head>
      <ToastContainer position="bottom-center" limit={1} />
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
                  {cartItemsCount > 0 && (
                    <span className="ml-1 rounded-full bg-red-600 px-2  text-as font-bold text-white">
                      {cartItemsCount}
                    </span>
                  )}
                </a>
              </Link>
              {status === 'loading' ? (
                'loading'
              ) : session?.user ? (
                <>
                  <span
                    onClick={() => setModalMenu(!modalMenu)}
                    className="text-pink-900 font-semibold cursor-pointer"
                  >
                    {session.user.name}
                  </span>

                  <div
                    className={`${
                      modalMenu ? 'max-h-[154px]' : 'max-h-0'
                    }  absolute z-20 right-0 rounded-md overflow-hidden shadow-2xl transition-all
                  }`}
                  >
                    <ModalMenu />
                  </div>
                </>
              ) : (
                <Link href="/login">
                  <a className="p-[8px] text-gray-100 hover:bg-pink-400 rounded-full">
                    Login
                  </a>
                </Link>
              )}
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
