import { PoolFormCreator } from '@/components';

export const metadata = {
  title: 'Create New Poll',
  description: 'Create a new poll',
};

export default function Page() {
  return (
    <section className='h-full w-full p-4'>
      <h1 className='font-bold'>Create New Poll</h1>
      <PoolFormCreator />
    </section>
  );
}
