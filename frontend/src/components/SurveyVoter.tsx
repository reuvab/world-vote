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

export const SurveyVoter = ({ title, image, option1, option2, option3, option4 }: Survey) => {
  const [isHuman, setIsHuman] = useState(false);
  const [worldId, setWorldId] = useState<WorldId | null>(null);

  return (
    <>
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
            <section className='flex flex-col items-center justify-center'>
              <Button onClick={open} className='button'>
                Identify to see the pool
              </Button>
            </section>
          )}
        </IDKitWidget>
      )}
      {!isHuman && (
        <SurveyCard
          title={title}
          image={image}
          option1={option1}
          option2={option2}
          option3={option3}
          option4={option4}
        />
      )}
    </>
  );
};
