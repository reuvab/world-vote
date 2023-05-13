'use client';
import React from 'react';
import { RadioGroup } from '@headlessui/react';
import { Survey } from '@/types';
import classNames from 'classnames';
import Button from '@mui/base/Button';

const Option = ({ option }: { option: string }) => (
  <RadioGroup.Option value={option}>
    {({ checked }) => (
      <div
        className={classNames(
          'h-8 flex items-center justify-start border-gray-200 border p-5 rounded-lg hover:bg-gray-200 cursor-pointer transition-all gap-3'
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
export const SurveyCard = ({ title, image, option1, option2, option3, option4 }: Survey) => {
  const [selected, setSelected] = React.useState(null);
  return (
    <div className='bg-white rounded-xl pt-6 px-10 text-slate-900'>
      <p className='pb-4 text-xs text-gray-500'>Select an Answer</p>
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
          <Button onClick={() => {}} className='button w-[60%]'>
            Vote
          </Button>
        </div>
      </div>
    </div>
  );
};
