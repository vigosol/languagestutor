import type { Metadata } from 'next';
import { sanityClient } from './sanity';
import { urlFor } from "./sanityImage";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.languagestutor.org';
export const SITE_NAME = 'LanguagesTutor';

type Locale = 'en' | 'ar' | string;

type LocalizedText = string | { en?: string; ar?: string } | undefined | null;

export type SeoData = {
  seoTitle?: LocalizedText;
  seoDescription?: LocalizedText;
  seoKeywords?: string[] | { en?: string[]; ar?: string[] } | string;
  ogImage?: any;
};

export function getLocalizedValue(value: LocalizedText, locale: Locale, fallback = ''): string {
  if (!value) return fallback;
  if (typeof value === 'string') return value || fallback;
  return value[locale as 'en' | 'ar'] || value.en || value.ar || fallback;
}

export function getLocalizedKeywords(value: SeoData['seoKeywords'], locale: Locale): string[] {
  if (!value) return [];
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value === 'string') {
    return value.split(',').map((item) => item.trim()).filter(Boolean);
  }
  return value[locale as 'en' | 'ar'] || value.en || value.ar || [];
}

export function buildMetadata({
  locale,
  path,
  seo,
  fallbackTitle,
  fallbackDescription,
}: {
  locale: Locale;
  path: string;
  seo?: SeoData | null;
  fallbackTitle: string;
  fallbackDescription: string;
}): Metadata {
  const title = getLocalizedValue(seo?.seoTitle, locale, fallbackTitle);
  const description = getLocalizedValue(seo?.seoDescription, locale, fallbackDescription);
  const keywords = getLocalizedKeywords(seo?.seoKeywords, locale);
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const canonical = `${SITE_URL}/${locale}${normalizedPath === '/' ? '' : normalizedPath}`;
  const ogImageUrl = seo?.ogImage
  ? urlFor(seo.ogImage).width(1200).height(630).url()
  : `${SITE_URL}/og-default.jpg`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
      languages: {
        en: `${SITE_URL}/en${normalizedPath === '/' ? '' : normalizedPath}`,
        ar: `${SITE_URL}/ar${normalizedPath === '/' ? '' : normalizedPath}`,
      },
    },
    openGraph: {
  title,
  description,
  url: canonical,
  siteName: SITE_NAME,
  locale: locale === "ar" ? "ar" : "en",
  type: "website",
  images: [
    {
      url: ogImageUrl,
      width: 1200,
      height: 630,
      alt: title,
    },
  ],
},
    twitter: {
  card: "summary_large_image",
  title,
  description,
  images: [ogImageUrl],
},
    icons: {
      icon: '/favicon.png',
    },
  };
}

export async function getPageSeo(pageKey: string): Promise<SeoData | null> {
  return sanityClient.fetch(
    `*[_type == "pageSeo" && pageKey == $pageKey][0]{seoTitle, seoDescription, seoKeywords, ogImage}`,
    { pageKey },
    { next: { revalidate: 60 } }
  );
}

export async function getSiteSettings() {
  return sanityClient.fetch(
    `*[_type == "siteSettings"][0]{
      googleAnalyticsId,
      googleTagManagerId,
      facebookPixelId,
      whatsappNumber,
      googleSiteVerification,
      bingVerification,
      defaultOgImage,
      desktopChatTool,
      mobileChatTool,
      tawkToWidgetUrl
    }`,
    {},
    { next: { revalidate: 60 } }
  );
}
