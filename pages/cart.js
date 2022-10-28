import Link from 'next/link';
import React, { useContext } from 'react';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import Image from 'next/image';
import { XCircleIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

function CartScreen() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const removeItemHandler = (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };
  const updateCartHandler = (item, qty) => {
    const quantity = Number(qty);
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
  };
  return (
    <Layout title="Shopping Cart">
      <h1 className="mb-4 text-xl font-primary font-bold">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="font-primary">
          Cart is empty.{' '}
          <Link href="/">
            <span className="cursor-pointer font-semibold rounded-[10px] p-2 text-white bg-pink-500">
              Shop Flowers Here
            </span>
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5 font-primary">
          <div className="overflow-x-auto md:col-span-3">
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th className="px-5 text-left">Item</th>
                  <th className="p-5 text-right">Quantity</th>
                  <th className="p-5 text-right">Price</th>
                  <th className="p-5">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.slug} className="border-b">
                    <td>
                      <Link href={`/product/${item.slug}`}>
                        <a className="flex items-center">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                          ></Image>
                          <span className="ml-[5px] lg:ml-[10px]">
                            {item.name}
                          </span>
                        </a>
                      </Link>
                    </td>
                    <td className="p-5 text-right">
                      <select
                        className="rounded-[10px] hover:text-white hover:bg-pink-400"
                        value={item.quantity}
                        onChange={(e) =>
                          updateCartHandler(item, e.target.value)
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-5 text-right">£{item.price}</td>
                    <td className="p-5 text-center">
                      <button onClick={() => removeItemHandler(item)}>
                        <XCircleIcon className="h-[25px] w-[25px] hover:bg-pink-500/50 rounded-full" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card p-5 mt-2">
            <ul>
              <li>
                <div className="p-3 flex justify-between">
                  Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}){' '}
                  {''}: £
                  {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                  {/* <div className="text-white text-sm p-2 rounded-[8px] bg-red-500 hover:bg-red-500/80 flex-2">
                    <a href={'/'}>Forget something?</a>
                  </div> */}
                </div>
              </li>
              <li>
                <button
                  onClick={() => router.push('login?redirect=/shipping')}
                  className="primary-button w-full"
                >
                  Check Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
