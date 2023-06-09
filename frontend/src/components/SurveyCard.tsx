'use client';
import React, { useContext, useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import { Survey } from '@/types';
import classNames from 'classnames';
import Button from '@mui/base/Button';
import { useRouter } from 'next/navigation';
import { DocumentTextIcon } from '@heroicons/react/24/solid';
import { getContract, handleContractTransaction } from '@/utils/contract';
import { WorldId } from './SurveyVoter';
import { UserContext } from '@/utils/userContext';
import { ethers } from 'ethers';
import { Modal } from './Modal';

const Option = ({ option }: { option: string }) => (
  <RadioGroup.Option value={option}>
    {({ checked }) => (
      <div
        className={classNames(
          'h-8 flex items-center justify-start border-gray-200 border p-5 rounded-lg hover:bg-blue-100/40 cursor-pointer transition-all gap-3 hover:text-lg',
          {
            'bg-blue-500/40 hover:bg-blue-500/40': checked,
          }
        )}
      >
        <input
          id='bordered-radio-1'
          type='radio'
          value=''
          checked={checked}
          onChange={() => {}}
          name='bordered-radio'
          className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2'
        />
        <div>{option}</div>
      </div>
    )}
  </RadioGroup.Option>
);
export const SurveyCard = ({
  title,
  hash,
  description,
  endTime,
  id,
  worldId,
}: Survey & { worldId: WorldId | null }) => {
  const router = useRouter();
  const [selected, setSelected] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

  const account = useContext(UserContext);
  console.log(account);

  return (
    <div className='flex flex-col justify-around items-center h-full'>
      <div className='flex flex-col items-center -mt-5'>
        <p className='flex pb-4 text-xs text-gray-500'>Select an Answer for Survey {id}</p>
        <div className='flex flex-col gap-4'>
          <RadioGroup
            value={selected}
            onChange={setSelected}
            className='flex flex-col
       gap-6'
          >
            <RadioGroup.Label className='font-bold flex items-center justify-center flex-col gap-3'>
              <h1>{title}</h1>
              <p className='text-xs text-gray-500'>{description}</p>
            </RadioGroup.Label>
            <div className='grid grid-rows-2 gap-y-4'>
              <Option option='Yes' />
              <Option option='No' />
            </div>
          </RadioGroup>
          <div className='flex items-center justify-end'>
            <Button
              disabled={isLoading}
              onClick={async () => {
                if (!selected || !worldId || account === '') return;
                setIsLoading(true);
                const contract = await getContract();
                const unpackedProof = ethers.utils.defaultAbiCoder.decode(
                  ['uint256[8]'],
                  worldId.proof
                )[0];

                try {
                  const tx = await contract.vote(
                    id,
                    selected === 'Yes' ? true : false,
                    account,
                    worldId.merkle_root,
                    worldId.nullifier_hash,
                    unpackedProof
                  );
                  const receipt = await handleContractTransaction(tx);
                  if (receipt) {
                    setIsLoading(false);
                    router.push(`/result/${id}`);
                  } else {
                    console.log('Transaction failed');
                    setIsOpened(true);
                    setIsLoading(false);
                  }
                } catch (e) {
                  setIsOpened(true);
                  setIsLoading(false);
                }
              }}
              className='button w-[60%]'
            >
              {isLoading ? 'Registering Vote...' : 'Vote'}
            </Button>
          </div>
        </div>
      </div>
      <div className='pt-12'>
        <a
          href={`https://ipfs.io/ipfs/${hash}/`}
          target='_blank'
          className='text-lg text-gray-500 flex flex-row'
        >
          <DocumentTextIcon className='w-6 h-6 inline-block mr-2' />
          View Survey Files on IPFS
        </a>
      </div>
      <Modal isOpen={isOpened} setIsOpen={setIsOpened} />
    </div>
  );
};
