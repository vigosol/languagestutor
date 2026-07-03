import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import {routing} from '@/i18n/routing';
import { ReactNode } from 'react';
import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { getSiteSettings } from "../lib/seo";
import FloatingWhatsApp from "../components/common/FloatingWhatsapp";
import ChatWidgets from "../components/common/ChatWidgets";
import Navbar from "../components/common/Navbar";
import { Toaster } from 'react-hot-toast'
import { GlobalProvider } from "../context/GlobalContext";
import Footer from '../components/common/Footer';
import DemoFormPopup from '../components/DemoFormPopup';
import NotFound from './not-found';

const geistSans = localFont({
  src: "../fonts/GeistVF.woff2",
  variable: "--font-geist-sans",
  display: "swap",
  weight: "100 900",
});

const notoSansArabic = localFont({
  src: "../fonts/NotoSansArabicVF.woff2",
  variable: "--font-noto-sans-arabic",
  display: "swap",
  weight: "100 900",
});


export const metadata: Metadata = {
    title: "LanguagesTutor",
    description: "Languages Tutor.",
    icons: {
      icon: '/favicon.png',
    },
  };

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {

  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    NotFound();
  }

  const messages = await getMessages();
  const siteSettings = await getSiteSettings();



  return (
    <html suppressHydrationWarning lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body
  className={`${geistSans.variable} ${notoSansArabic.variable} ${
    locale === "ar" ? "font-noto_sans_arabic" : "font-geist"
  } antialiased`}
>
        <NextIntlClientProvider locale={locale} messages={messages}>
         {
  siteSettings?.googleAnalyticsId && (
    <GoogleAnalytics
      gaId={siteSettings.googleAnalyticsId}
    />
  )
} 
        <GlobalProvider>
              <Navbar/>
              {children} 
              <Footer/>
              <ChatWidgets
  desktopChatTool={siteSettings?.desktopChatTool}
  mobileChatTool={siteSettings?.mobileChatTool}
  whatsappNumber={siteSettings?.whatsappNumber}
  tawkToWidgetUrl={siteSettings?.tawkToWidgetUrl}
/>
              {/* <DemoFormPopup/> */}
              <Toaster
                position="top-right" 
                toastOptions={{
                  style: {
                    background: '#333',
                    color: '#fff',
                  },
                }}
              />
            </GlobalProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
