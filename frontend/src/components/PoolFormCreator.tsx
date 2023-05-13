'use client';
import React, { useReducer, useState } from 'react';
import Button from '@mui/base/Button';
import Input from '@mui/base/Input';
import { Survey } from '@/types';

const initialState: Survey = {
  title: '',
  image: '',
  option1: '',
  option2: '',
  option3: '',
  option4: '',
};

type Action = {
  type: keyof Survey | 'reset';
  payload: string;
};

const reducer = (state: Survey, action: Action) => {
  switch (action.type) {
    case 'title':
      return { ...state, title: action.payload };
    case 'image':
      return { ...state, image: action.payload };
    case 'option1':
      return { ...state, option1: action.payload };
    case 'option2':
      return { ...state, option2: action.payload };
    case 'option3':
      return { ...state, option3: action.payload };
    case 'option4':
      return { ...state, option4: action.payload };
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

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      console.log('clicked');
      console.log({
        title: state.title,
        image: state.image,
        option1: state.option1,
        option2: state.option2,
        option3: state.option3,
        option4: state.option4,
      });
      dispatch({ type: 'reset', payload: '' });
      setIsLoading(false);
    }, 200);
  };

  return (
    <>
      <form className='flex flex-col'>
        <PoolFormInput label='Poll Title' value={state.title} dispatch={dispatch} field='title' />
        <PoolFormInput label='Image' value={state.image} dispatch={dispatch} field='image' />
        <PoolFormInput
          label='Pool Option 1'
          value={state.option1}
          dispatch={dispatch}
          field='option1'
        />
        <PoolFormInput
          label='Pool Option 2'
          value={state.option2}
          dispatch={dispatch}
          field='option2'
        />
        <PoolFormInput
          label='Pool Option 3'
          value={state.option3}
          dispatch={dispatch}
          field='option3'
        />
        <PoolFormInput
          label='Pool Option 4'
          value={state.option4}
          dispatch={dispatch}
          field='option4'
        />
      </form>
      <Button
        className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
        onClick={handleClick}
      >
        {isLoading ? 'Loading...' : 'Create Pool'}
      </Button>
    </>
  );
};
