'use client';
import React from 'react';
import { RadioGroup } from '@headlessui/react';
import { Survey } from '@/types';
import classNames from 'classnames';
import Button from '@mui/base/Button';
import { useRouter } from 'next/navigation';

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
export const SurveyCard = ({ title, image, option1, option2, id }: Survey) => {
  const router = useRouter();
  const [selected, setSelected] = React.useState(null);
  return (
    <div className=''>
      <p className='pb-4 text-xs text-gray-500'>Select an Answer {id}</p>
      <div className='grid grid-rows-2'>
        <RadioGroup
          value={selected}
          onChange={setSelected}
          className='flex flex-col
       gap-6'
        >
          <RadioGroup.Label className='font-bold flex items-center justify-center'>
            {title}
          </RadioGroup.Label>
          <div className='grid grid-rows-2 gap-y-4'>
            <Option option={option1} />
            <Option option={option2} />
          </div>
        </RadioGroup>
        <div className='flex items-center justify-end'>
          <Button
            onClick={() => {
              if (!selected) return;
              console.log(selected);
              router.push(`/result/${id}`);
            }}
            className='button w-[60%]'
          >
            Vote
          </Button>
        </div>
      </div>
    </div>
  );
};
