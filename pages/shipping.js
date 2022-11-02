import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import CheckoutWizzard from '../components/CheckoutWizzard';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';

export default function ShippingScreen() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress } = cart;
  const router = useRouter();

  useEffect(() => {
    setValue('fullName', shippingAddress.fullName);
    setValue('address', shippingAddress.address);
    setValue('city', shippingAddress.city);
    setValue('postCode', shippingAddress.postCode);
    setValue('country', shippingAddress.country);
  }, [setValue, shippingAddress]);

  const submitHandler = ({ fullName, address, city, postCode, country }) => {
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: { fullName, address, city, postCode, country },
    });
    Cookies.set(
      'cart',
      JSON.stringify({
        ...cart,
        shippingAddress: {
          fullName,
          address,
          city,
          postCode,
          country,
        },
      })
    );

    router.push('/payment');
  };

  return (
    <Layout title="Shipping Address">
      <CheckoutWizzard activeStep={1} />
      <form
        className="mx-auto max-w-screen-md font-primary"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-[16px] text-xl font-primary">Shipping address</h1>
        <div className="mb-[16px]">
          <label htmlFor="fullName">Name</label>
          <input
            className="w-full border-black/50 rounded-[4px] border-2"
            id="fullName"
            autoFocus
            {...register('fullName', {
              required: 'Please enter full name',
            })}
          />
          {errors.fullName && (
            <div className="text-red-500">{errors.fullName.message}</div>
          )}
        </div>
        <div className="mb-[16px]">
          <label htmlFor="address">Address</label>
          <input
            className="w-full border-black/50 rounded-[4px] border-2"
            id="address"
            autoFocus
            {...register('address', {
              required: 'Please enter address',
              minLength: { value: 5, message: 'Please enter full address' },
            })}
          />
          {errors.address && (
            <div className="text-red-500">{errors.address.message}</div>
          )}
        </div>
        <div className="mb-[16px]">
          <label htmlFor="city">City</label>
          <input
            className="w-full border-black/50 rounded-[4px] border-2"
            id="city"
            autoFocus
            {...register('city', {
              required: 'Please enter city',
            })}
          />
          {errors.city && (
            <div className="text-red-500">{errors.city.message}</div>
          )}
        </div>
        <div className="mb-[16px]">
          <label htmlFor="postCode">Post Code</label>
          <input
            className="w-full border-black/50 rounded-[4px] border-2"
            id="postCode"
            autoFocus
            {...register('postCode', {
              required: 'Please enter post code',
            })}
          />
          {errors.postCode && (
            <div className="text-red-500">{errors.postCode.message}</div>
          )}
        </div>
        <div className="mb-[16px]">
          <label htmlFor="country">Country</label>
          <input
            className="w-full border-black/50 rounded-[4px] border-2"
            id="country"
            autoFocus
            {...register('country', {
              required: 'Please enter country',
            })}
          />
          {errors.country && (
            <div className="text-red-500">{errors.country.message}</div>
          )}
        </div>
        <div className="mb-[16px] flex justify-between">
          <button className="primary-button">Next</button>
        </div>
      </form>
    </Layout>
  );
}

ShippingScreen.auth = true;
