import ContactClient from './ContactClient';
import { buildMetadata, getPageSeo } from '@/app/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const seo = await getPageSeo('contact');

  return buildMetadata({
    locale,
    path: '/contact',
    seo,
    fallbackTitle: 'Contact | LanguagesTutor',
    fallbackDescription: 'Contact LanguagesTutor for language course inquiries and demo classes.',
  });
}

export default function ContactPage() {
  return <ContactClient />;
}
