'use client';
import { SurveyVoter } from '@/components';
import { getContract } from '@/utils/contract';
import { useEffect, useState } from 'react';

export default function Page({ params }: { params: { id: string } }) {
  const [title, setTitle] = useState<string>('');
  const [hash, setHash] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    const fetchPoolInfo = async () => {
      const contract = await getContract();
      const poolInfo = await contract.getPoll(params.id);
      const [poolTitle, poolDescription, , , poolHash] = poolInfo;
      setTitle(poolTitle);
      setHash(poolHash);
      setDescription(poolDescription);

      //TODO: add end time
    };
    fetchPoolInfo();
  }, []);
  return (
    <section className='h-full w-full p-4'>
      <SurveyVoter title={title} hash={hash} description={description} endTime='0' id={params.id} />
    </section>
  );
}
