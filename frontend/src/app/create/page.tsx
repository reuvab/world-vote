import { PoolFormCreator } from '@/components';

export const metadata = {
  title: 'Create New Poll',
  description: 'Create a new poll',
};

export default function Page() {
  return (
    <section className='h-20 border w-[50%]'>
      <h1 className='text-2xl'>Create New Poll</h1>
      <PoolFormCreator />
    </section>
  );
}
