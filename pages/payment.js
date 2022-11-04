import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';

export default function PaymentScreen() {
  const [selectedPayment, setSelectedPayment] = useState('');

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress, payment } = cart;

  const router = useRouter();

  const submitHandler = (e) => {
    e.preventDefault();
    if (!selectedPayment) {
      return toast.error('Payment selection is required');
    }
    dispatch({ type: 'SAVE_PAYMENT_METHOD, payload: selectedPayment' });
    Cookies.set(
      'cart',
      JSON.stringify({
        ...cart,
        payment: selectedPayment,
      })
    );

    router.push('/placeorder');
  };
  useEffect(() => {
    if (!shippingAddress.address) {
      return router.push('/shipping');
    }
    setSelectedPayment(payment || '');
  }, [payment, router, shippingAddress.address]);

  return (
    <Layout title="Payment Screen">
      <CheckoutWizard activeStep={2} />
      {/* form for payment */}
      <form className="mx-auto max-w-screen-md" onSubmit={submitHandler}>
        <h1 className="mb-[16px] text-lg">Payment</h1>
        {['Stripe', 'Cash on delivery'].map((payment) => (
          <div key={payment} className="mb-4">
            <input
              name="paymentType"
              className="p-[8px] outline-none focus:ring-0"
              id={payment}
              type="radio"
              checked={selectedPayment === payment}
              onChange={() => setSelectedPayment(payment)}
            />
            <label className="p-[8px]" htmlFor={payment}>
              {payment}
            </label>
          </div>
        ))}
        <div className="mb-[16px] flex justify-between">
          <button
            className="default-button"
            type="button"
            onClick={() => router.push('/shipping')}
          >
            Back
          </button>
          <button className="primary-button">Next</button>
        </div>
      </form>
    </Layout>
  );
}

PaymentScreen.auth = true;
