import Cookies from 'js-cookie';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import React, { useContext } from 'react';
import { Store } from '../utils/Store';

export default function ModalMenu() {
  const { dispatch } = useContext(Store);

  const logoutClickHandler = () => {
    Cookies.remove('cart');
    dispatch({ type: 'CART_RESET' });
    signOut({ callbackUrl: '/login' });
  };

  return (
    <nav className="bg-pink-600 w-full p-4">
      <ul className="text-white space-y-3">
        <li>
          <Link href="/profile">
            <span className="hover:bg-pink-500 rounded-[8px] p-1">Profile</span>
          </Link>
        </li>
        <li>
          <Link href="/order-history">
            <span className="hover:bg-pink-500 rounded-[8px] p-1">
              Order History
            </span>
          </Link>
        </li>
        <li>
          <Link href="#">
            <a
              className="hover:bg-pink-500 rounded-[8px] p-1"
              onClick={logoutClickHandler}
            >
              Logout
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
