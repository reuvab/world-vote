import { useState } from 'react';
import { Dialog } from '@headlessui/react';

export function Modal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className='relative z-50'>
      <div className='fixed inset-0 right-[800px] flex items-center justify-center'>
        <Dialog.Panel className='w-[258px] rounded-xl bg-slate-400 p-8 shadow-deep'>
          <div className='flex w-full flex-col items-center space-y-6'>
            <Dialog.Title className='text-white font-bold'>Already Voted</Dialog.Title>
            <Dialog.Description className='text-white'>
              You can only vote once for this
            </Dialog.Description>

            <p>
              You can only vote once for this survey. You can vote for other surveys, but not this
              one. As an individual, you have only one vote.
            </p>

            <button className='button' onClick={() => setIsOpen(false)}>
              Understood
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
