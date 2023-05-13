'use client';
import React, { useReducer, useState } from 'react';
import Button from '@mui/base/Button';
import Input from '@mui/base/Input';
import { Survey } from '@/types';
import { getContract, handleContractTransaction } from '@/utils/contract';

const initialState: Survey = {
  id: '',
  title: '',
  hash: '',
  description: '',
  endTime: '0',
};

type Action = {
  type: keyof Survey | 'reset';
  payload: string;
};

const reducer = (state: Survey, action: Action) => {
  switch (action.type) {
    case 'title':
      return { ...state, title: action.payload };
    case 'hash':
      return { ...state, hash: action.payload };
    case 'description':
      return { ...state, description: action.payload };
    case 'endTime':
      return { ...state, endTime: action.payload };
    case 'reset':
      return initialState;
    default:
      return state;
  }
};

const PoolFormInput = ({
  label,
  value,
  dispatch,
  field,
}: {
  label: string;
  value: string;
  dispatch: React.Dispatch<Action>;
  field: Action['type'];
}) => {
  return (
    <>
      <label className='text-xl'>{label}</label>
      <Input
        className='border'
        type='text'
        value={value}
        onChange={(v) => dispatch({ type: field, payload: v.target.value })}
      />
    </>
  );
};

export const PoolFormCreator = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState('');

  const handleClick = async () => {
    setIsLoading(true);
    const contract = await getContract();
    const tx = await contract.createPoll(state.title, state.description, state.hash);
    console.log(tx);
    const transactionReceipt = await handleContractTransaction(tx);
    if (transactionReceipt) {
      console.log(transactionReceipt.events?.[0].args?.[0]);
      setId(transactionReceipt.events?.[0].args?.[0].toString());
      //dispatch({ type: 'reset', payload: '' });
      console.log('Transaction successful');
    } else {
      console.log('Transaction failed');
    }
    setIsLoading(false);
  };

  return (
    <>
      <form className='flex flex-col'>
        <PoolFormInput label='Survey Title' value={state.title} dispatch={dispatch} field='title' />
        <PoolFormInput
          label='Description'
          value={state.description}
          dispatch={dispatch}
          field='description'
        />
        <PoolFormInput
          label='Document IPFS Hash'
          value={state.hash}
          dispatch={dispatch}
          field='hash'
        />
        <PoolFormInput label='End Time' value={state.endTime} dispatch={dispatch} field='endTime' />
      </form>
      <Button
        className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
        onClick={handleClick}
      >
        {isLoading ? 'Loading...' : 'Create Pool'}
      </Button>
      {id && (
        <div className='text-center'>
          <p className='text-xl'>Pool Created!</p>
          <p className='text-xl'>ID: {id}</p>
        </div>
      )}
    </>
  );
};
