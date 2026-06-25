

import { buildMetadata, getPageSeo } from '@/app/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const seo = await getPageSeo('books');

  return buildMetadata({
    locale,
    path: '/books',
    seo,
    fallbackTitle: 'Books | LanguagesTutor',
    fallbackDescription: 'Explore language learning books from LanguagesTutor.',
  });
}

export default function Books() {

  return (
      <section className="pt-14 pb-20 ">
        <div className="w-full max-w-[1440px] mx-auto px-5">
        <div className="grid grid-cols-2">
          <div className="w-full">
            <h1 className='text-5xl mb-3  font-medium'>Books</h1>
            <p className='text-base mb-1'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur ullam impedit, blanditiis cupiditate vel quidem error eveniet dicta. Commodi hic aliquid laudantium reprehenderit quas saepe esse voluptatibus est sunt deserunt.</p>
            <p className='text-base mb-1'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur ullam impedit, blanditiis cupiditate vel quidem error eveniet dicta. Commodi hic aliquid laudantium reprehenderit quas saepe esse voluptatibus est sunt deserunt.</p>
            <p className='text-base mb-1'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur ullam impedit, blanditiis cupiditate vel quidem error eveniet dicta. Commodi hic aliquid laudantium reprehenderit quas saepe esse voluptatibus est sunt deserunt.</p>
            <p className='text-base mb-1'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur ullam impedit, blanditiis cupiditate vel quidem error eveniet dicta. Commodi hic aliquid laudantium reprehenderit quas saepe esse voluptatibus est sunt deserunt.</p>
            <p className='text-base mb-1'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur ullam impedit, blanditiis cupiditate vel quidem error eveniet dicta. Commodi hic aliquid laudantium reprehenderit quas saepe esse voluptatibus est sunt deserunt.</p>
          </div>     
        </div>
        </div>
      </section>
  )
}
