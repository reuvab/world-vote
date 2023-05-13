import Image from 'next/image';
import React from 'react';

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className='h-full flex flex-col justify-start gap-10'>
      <div className='flex flex-col'>
        <p>You voted for Survey {params.id}</p>
        <Image src='/party.png' alt='Picture of the author' width={200} height={200} />
      </div>
      <div>
        <h1>Results</h1>
        <div className='flex flex-col'>
          <div className='flex flex-row'>
            <p>Yes</p>
            <p>10</p>
          </div>
          <div className='flex flex-row'>
            <p>No</p>
            <p>10</p>
          </div>
        </div>
      </div>
    </div>
  );
}
