'use client';
import React, { useState } from 'react';

import dynamic from 'next/dynamic';
import Button from '@mui/base/Button';
import { Survey } from '@/types';
import { SurveyCard } from '@/components/SurveyCard';

const IDKitWidget = dynamic(() => import('@worldcoin/idkit').then((mod) => mod.IDKitWidget), {
  ssr: false,
});
type WorldId = {
  merkle_root: string;
  proof: string;
  credential_type: string;
  nullifier_hash: string;
};

export const SurveyVoter = ({ title, image, option1, option2, id }: Survey) => {
  const [isHuman, setIsHuman] = useState(false);
  const [worldId, setWorldId] = useState<WorldId | null>(null);

  return (
    <div className='text-slate-900 h-full'>
      {isHuman && (
        <IDKitWidget
          action='my_signal'
          onSuccess={(result) => {
            setIsHuman(true);
            console.log(result);
            setWorldId(result);
          }}
          app_id='app_staging_57a3eb0482e27d59db5da1ece85fa642'
        >
          {({ open }) => (
            <div className='flex justify-center items-center h-full -mt-6'>
              <Button onClick={open} className='button'>
                Identify to see the pool
              </Button>
            </div>
          )}
        </IDKitWidget>
      )}
      {!isHuman && (
        <SurveyCard title={title} image={image} option1={option1} option2={option2} id={id} />
      )}
    </div>
  );
};
