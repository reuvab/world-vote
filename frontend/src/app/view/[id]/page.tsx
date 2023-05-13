import { SurveyVoter } from '@/components';

export const metadata = {
  title: 'Read Poll',
  description: 'Create a new poll',
};

export default function Page({ params }: { params: { id: string } }) {
  return (
    <section className='h-full w-full p-4'>
      <SurveyVoter
        title='Would you like all building to be painted in red?'
        image='test'
        option1='Yes'
        option2='No'
        id={params.id}
      />
    </section>
  );
}
