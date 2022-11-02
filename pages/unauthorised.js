import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../components/Layout';

export default function Unauthorised() {
  const router = useRouter();
  const { message } = router.query;
  return (
    <Layout title="Unauthorised Page">
      <h1 className="text-xl">Access Prohibited</h1>
      <Link href="/login">
        <a>
          {message && <div className="mb-[16px] text-red-500">{message}</div>}
        </a>
      </Link>
    </Layout>
  );
}
