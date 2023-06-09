'use client';
import React, { useContext, useState } from 'react';

import dynamic from 'next/dynamic';
import Button from '@mui/base/Button';
import { Survey } from '@/types';
import { SurveyCard } from '@/components/SurveyCard';
import { solidityEncode } from '@worldcoin/idkit';
import { UserContext } from '@/utils/userContext';

const IDKitWidget = dynamic(() => import('@worldcoin/idkit').then((mod) => mod.IDKitWidget), {
  ssr: false,
});
export type WorldId = {
  merkle_root: string;
  proof: string;
  credential_type: string;
  nullifier_hash: string;
};

export const SurveyVoter = ({ title, hash, description, endTime, id }: Survey) => {
  const [isHuman, setIsHuman] = useState(false);
  const [worldId, setWorldId] = useState<WorldId | null>(null);

  const account = useContext(UserContext);

  return (
    <div className='text-slate-900 h-full'>
      {!isHuman && (
        <IDKitWidget
          action='action_id'
          signal={solidityEncode(['address'], [account])}
          onSuccess={(result) => {
            setIsHuman(true);
            console.log(result);
            setWorldId(result);
          }}
          app_id='app_a3813ad19964a976be18e03679ac9efe'
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
      {isHuman && (
        <SurveyCard
          title={title}
          hash={hash}
          description={description}
          endTime={endTime}
          id={id}
          worldId={worldId}
        />
      )}
    </div>
  );
};
