/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';

export default function ProductItem({ product, addToCartHandler }) {
  return (
    // product card with image
    <div className="card max-w-[500px] mx-auto">
      <div className="max-w-[500px] mx-auto">
        <Link href={`/product/${product.slug}`}>
          <a>
            <img
              src={product.image}
              alt={product.name}
              className="rounded shadow max-w-[90%] max-h-[800px] mx-auto"
            />
          </a>
        </Link>
      </div>
      {/* product info */}
      <div className="flex flex-col items-center justify-center p-5 font-primary">
        <Link href={`/product/${product.slug}`}>
          <a>
            <h2 className="text-lg text-slate-800">{product.name}</h2>
          </a>
        </Link>
        <p className="mb-[8px]">{product.brand}</p>
        <p>£{product.price}</p>
        <button
          className="primary-button"
          type="button"
          onClick={() => {
            addToCartHandler(product);
          }}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
