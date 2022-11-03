/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';

export default function ProductItem({ product }) {
  return (
    <div className="card max-w-[500px] mx-auto">
      <div className="max-w-[500px] mx-auto">
        <Link href={`/product/${product.slug}`}>
          <a>
            <img
              src={product.image}
              alt={product.name}
              className="rounded shadow"
            />
          </a>
        </Link>
      </div>

      <div className="flex flex-col items-center justify-center p-5 font-primary">
        <Link href={`/product/${product.slug}`}>
          <a>
            <h2 className="text-lg text-slate-800">{product.name}</h2>
          </a>
        </Link>
        <p className="mb-[8px]">{product.brand}</p>
        <p>£{product.price}</p>
        <button className="primary-button" type="button">
          Add to cart
        </button>
      </div>
    </div>
  );
}
