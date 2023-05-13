import { SurveyVoter } from '@/components';

export const metadata = {
  title: 'Read Poll',
  description: 'Create a new poll',
};

export default function Page() {
  return (
    <section className=''>
      <SurveyVoter
        title='Would you like all building to be painted in red?'
        image='test'
        option1='Yes'
        option2='No'
        option3='Green'
        option4='Yellow'
      />
    </section>
  );
}
