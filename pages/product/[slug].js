import axios from 'axios';
import React, { useContext } from 'react';
import Layout from '../../components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import { Store } from '../../utils/Store';
import db from '../../utils/db';
import Product from '../../models/Product';
import { toast } from 'react-toastify';

export default function ProductScreen(props) {
  const { product } = props;
  const { state, dispatch } = useContext(Store);

  if (!product) {
    return <Layout title="Product Not Found">Product Not Found</Layout>;
  }

  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error('Product is out of stock');
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
  };

  return (
    <Layout title={product.name}>
      <div className="py-[8px] font-primary cursor-pointer pb-5">
        <Link href="/">
          <span className="bg-pink-400/50 rounded-[10px] hover:bg-pink-500 p-2 text-white">
            Back to products 👈
          </span>
        </Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            width={480}
            height={400}
            layout="responsive"
            className="rounded-[8px]"
          ></Image>
        </div>
        <div className="font-primary mt-2">
          <ul>
            <li>
              <h1 className="text-lg font-bold">{product.name}</h1>
            </li>
            <li className="font-secondary">Category: {product.category}</li>
            <li className="font-secondary">Brand: {product.brand}</li>
            <li className="font-secondary">
              {product.rating} of {product.numReviews} reviews
            </li>
            <li className="font-secondary">
              Description: {product.description}
            </li>
          </ul>
        </div>
        <div>
          <div className="card p-5 font-[poppins]">
            <div className="mb-2 flex justify-between">
              <div>Price</div>
              <div>£{product.price}</div>
            </div>
            <div className="mb-2 flex justify-between">
              <div>Status</div>
              <div>{product.countInStock > 0 ? 'In Stock' : 'Unavailble'}</div>
            </div>
            <div className="flex">
              <button
                className="primary-button mx-auto"
                onClick={addToCartHandler}
              >
                Add to your cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: product ? db.convertDocToObj(product) : null,
    },
  };
}
