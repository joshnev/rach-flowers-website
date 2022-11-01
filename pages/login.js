import Link from 'next/link';
import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import { signIn, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { getError } from '../utils/error';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

export default function LoginScreen() {
  const { data: session } = useSession();

  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/');
    }
  }, [router, session, redirect]);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const submitHandler = async ({ email, password }) => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="Login">
      <form
        className="mx-auto max-w-screen-md font-primary"
        onSubmit={handleSubmit(submitHandler)}
        noValidate
      >
        {/* email input and validation */}
        <h1 className="mb-4 text-xl">Login</h1>
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            {...register('email', {
              required: 'Please enter email',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: 'Please enter a valid email address',
              },
            })}
            className="w-full bg-pink-400/20 rounded-[8px] outline-none ring-pink-500/50 focus:ring p-2"
            id="email"
            autoFocus
          ></input>
          {errors.email && (
            <div className="text-red-500 font-secondary">
              {errors.email.message}
            </div>
          )}
        </div>
        {/* form password and validation */}
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            {...register('password', {
              required: 'Please enter password',
              minLength: {
                value: 6,
                message: 'password is more than 5 characters',
              },
            })}
            className="w-full bg-pink-400/20 rounded-[8px] outline-none ring-pink-500/50 focus:ring p-2"
            id="password"
            autoFocus
          ></input>
          {errors.password && (
            <div className="text-red-500 font-secondary">
              {errors.password.message}
            </div>
          )}
        </div>
        <div className="mb-4">
          <button className="primary-button">Login</button>
        </div>
        <div className="mb-4">
          <span className="mr-3 font-semibold">Need an account?</span>
          <Link href="register">
            <a className="text-blue-700 hover:text-blue-800">
              Register here...
            </a>
          </Link>
        </div>
      </form>
    </Layout>
  );
}
