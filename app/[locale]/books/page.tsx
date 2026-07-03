import { buildMetadata, getPageSeo } from '@/app/lib/seo';
import { getLocale } from 'next-intl/server';
import StaticPageSchema from '@/app/components/StaticPageSchema';
import JsonLd from '@/app/components/JsonLd';
import { booksCollectionSchema } from '@/app/lib/schema';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
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

export default async function Books() {
  const locale = await getLocale();
  const isArabic = locale === 'ar';

  const books = [
    {
      title: isArabic ? 'كتاب تعلم البشتو للمبتدئين' : 'Pashto Beginner Learning Book',
      author: 'Mohsin Ali',
      description: isArabic
        ? 'كتاب عملي يساعد المبتدئين على تعلم حروف البشتو والكلمات الأساسية والجمل اليومية بطريقة سهلة ومنظمة.'
        : 'A practical beginner book for learning Pashto letters, basic words, and everyday sentences step by step.',
      language: isArabic ? 'البشتو' : 'Pashto',
    },
    {
      title: isArabic ? 'كتاب أساسيات اللغة العربية' : 'Arabic Foundations Book',
      author: 'Mohsin Ali',
      description: isArabic
        ? 'كتاب مناسب للمبتدئين يساعدك على تعلم القراءة والكتابة والمحادثة والقواعد الأساسية في اللغة العربية.'
        : 'A beginner-friendly book for Arabic reading, writing, speaking, and grammar foundations.',
      language: isArabic ? 'العربية' : 'Arabic',
    },
    {
      title: isArabic ? 'كتاب تعلم اللغة الأردية' : 'Urdu Language Learning Book',
      author: 'Mohsin Ali',
      description: isArabic
        ? 'كتاب شامل يساعدك على تعلم القراءة والكتابة والمحادثة باللغة الأردية من خلال شرح واضح وتدريبات عملية.'
        : 'A complete Urdu learning book covering reading, writing, grammar, and daily conversation.',
      language: isArabic ? 'الأردية' : 'Urdu',
    },
  ];

  const booksSchema = booksCollectionSchema({
  books,
  locale,
});

  return (
  <>
    <StaticPageSchema page="books" locale={locale} />
    {booksSchema && (
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [booksSchema],
        }}
      />
    )}

      <section className="pt-14 pb-20">
  <div className="w-full max-w-[900px] mx-auto px-5">
    <div className="flex flex-col gap-10">
            <div className="w-full">
              <h1 className="text-5xl mb-4 font-medium">
                {isArabic ? 'كتب تعلم اللغات' : 'Language Learning Books'}
              </h1>

              <p className="text-base mb-3">
                {isArabic
                  ? 'استكشف مجموعة من كتب تعلم اللغات المصممة لمساعدة الطلاب على تطوير مهارات القراءة والكتابة والقواعد والمحادثة بطريقة سهلة وعملية.'
                  : 'Explore a growing collection of language learning books designed to help students improve reading, writing, grammar, vocabulary, and communication skills in a simple and practical way.'}
              </p>

              <p className="text-base mb-3">
                {isArabic
                  ? 'تم إعداد هذه الموارد لدعم متعلمي البشتو والعربية والأردية، سواء كانوا مبتدئين أو يرغبون في تقوية أساسياتهم اللغوية خطوة بخطوة.'
                  : 'These resources support Pashto, Arabic, and Urdu learners, whether they are complete beginners or students who want to strengthen their language foundation step by step.'}
              </p>

              <p className="text-base mb-3">
                {isArabic
                  ? 'كل كتاب يركز على التعلم العملي من خلال أمثلة واضحة، كلمات مستخدمة في الحياة اليومية، وجمل تساعدك على استخدام اللغة بثقة.'
                  : 'Each book focuses on practical learning through clear examples, everyday vocabulary, and useful sentences that help learners use the language with confidence.'}
              </p>

              <p className="text-base mb-3">
                {isArabic
                  ? 'هذه الكتب مناسبة للأطفال والكبار والسيدات والمتعلمين من مختلف الخلفيات، ويمكن استخدامها مع الدورات الأونلاين أو للمراجعة الذاتية.'
                  : 'The books are suitable for kids, adults, ladies, and learners from different backgrounds. They can be used alongside online courses or for self-study practice.'}
              </p>

              <p className="text-base mb-1">
                {isArabic
                  ? 'ابدأ رحلتك التعليمية مع موارد منظمة تساعدك على بناء مهارات لغوية قوية بطريقة واضحة ومريحة.'
                  : 'Start your learning journey with structured resources that help you build strong language skills in a clear and comfortable way.'}
              </p>
            </div>

            <div className="w-full grid grid-cols-1 gap-5">
              {books.map((book) => (
                <div
                  key={book.title}
                  className="border border-black1/10 rounded-2xl p-6 bg-white"
                >
                  <span className="text-sm font-medium text-gray5">
                    {book.language}
                  </span>

                  <h2 className="text-2xl font-medium mt-2 mb-2">
                    {book.title}
                  </h2>

                  <p className="text-sm text-gray5 mb-2">
                    {isArabic ? 'المؤلف:' : 'Author:'} {book.author}
                  </p>

                  <p className="text-base">
                    {book.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}