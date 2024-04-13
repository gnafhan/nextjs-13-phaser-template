'use client';
import dynamic from 'next/dynamic';

const AppWithoutSSR = dynamic(() => import('./App'), { ssr: false });

export default function Home() {
  return (
    // <div className='flex justify-center'>
    <main>
        <AppWithoutSSR />
    </main>
    // </div>
  );
}
