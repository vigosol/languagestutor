const SITE_URL = "https://www.languagestutor.org";

export function getBaseUrl(locale: string) {
  return locale === "ar" ? `${SITE_URL}/ar` : SITE_URL;
}

export function getPageUrl(locale: string, path: string = "/") {
  const cleanPath = path === "/" ? "" : path;
  return locale === "ar"
    ? `${SITE_URL}/ar${cleanPath}`
    : `${SITE_URL}${cleanPath}`;
}

export function organizationSchema(locale: string = "en") {
  return {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "LanguagesTutor",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/favicon.png`
    },
    description:
      locale === "ar"
        ? "LanguagesTutor منصة تعليم لغات أونلاين تقدم دورات في البشتو والعربي والأردي والإنجليزي للأطفال والكبار والسيدات والمحترفين من مختلف دول العالم."
        : "LanguagesTutor is an online language-learning platform offering structured Pashto, Arabic, Urdu, and English courses for kids, adults, ladies, professionals, and global learners.",
    founder: {
      "@id": `${SITE_URL}/#mohsin-ali`
    },
    knowsAbout: [
      "Pashto language learning",
      "Arabic language learning",
      "Urdu language learning",
      "Quran reading",
      "Tajweed",
      "Gulf Arabic",
      "Online language tutoring"
    ],
    areaServed: [
      "United States",
      "United Kingdom",
      "Canada",
      "Australia",
      "Pakistan",
      "Saudi Arabia",
      "United Arab Emirates",
      "Qatar",
      "Kuwait",
      "Bahrain",
      "Oman"
    ]
  };
}

export function personSchema(locale: string = "en") {
  return {
    "@type": "Person",
    "@id": `${SITE_URL}/#mohsin-ali`,
    name: "Mohsin Ali",
    jobTitle:
      locale === "ar"
        ? "مؤسس ومدرس لغات"
        : "Founder and Lead Language Instructor",
    worksFor: {
      "@id": `${SITE_URL}/#organization`
    },
    url: getPageUrl(locale, "/about"),
    description:
      locale === "ar"
        ? "محسن علي هو مؤسس LanguagesTutor ومدرس لغات يقدم دورات عملية في البشتو والعربي والأردي والإنجليزي بطريقة سهلة ومنظمة."
        : "Mohsin Ali is the founder of LanguagesTutor and an experienced language instructor teaching Pashto, Arabic, Urdu, and English through practical online courses.",
    knowsAbout: [
      "Pashto language",
      "Arabic language",
      "Urdu language",
      "English language",
      "Quran reading",
      "Tajweed",
      "Gulf Arabic",
      "Online education"
    ]
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "LanguagesTutor",
    url: SITE_URL,
    publisher: {
      "@id": `${SITE_URL}/#organization`
    },
    inLanguage: ["en", "ar"]
  };
}

export function breadcrumbSchema(
  locale: string,
  items: { name: string; path: string }[]
) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${getPageUrl(locale, items[items.length - 1]?.path || "/")}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: getPageUrl(locale, item.path)
    }))
  };
}

export function webpageSchema({
  locale,
  path,
  title,
  description
}: {
  locale: string;
  path: string;
  title: string;
  description: string;
}) {
  return {
    "@type": "WebPage",
    "@id": `${getPageUrl(locale, path)}#webpage`,
    url: getPageUrl(locale, path),
    name: title,
    description,
    isPartOf: {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: "LanguagesTutor",
  url: SITE_URL,
  publisher: {
    "@id": `${SITE_URL}/#organization`
  },
  inLanguage: ["en", "ar"]
},
    about: {
      "@id": `${SITE_URL}/#organization`
    },
    breadcrumb: {
      "@id": `${getPageUrl(locale, path)}#breadcrumb`
    },
    inLanguage: locale
  };
}

export function getSchemaText(value: any, locale: string = "en"): string {
  if (!value) return "";

  if (typeof value === "string") return value;

  if (Array.isArray(value)) {
    return value
      .map((item) => getSchemaText(item, locale))
      .filter(Boolean)
      .join(" ");
  }

  if (typeof value === "object") {
    if (value[locale]) return getSchemaText(value[locale], locale);
    if (value.en) return getSchemaText(value.en, locale);
    if (value.ar) return getSchemaText(value.ar, locale);

    if (value.children) {
      return value.children
        .map((child: any) => child.text || "")
        .join(" ");
    }
  }

  return "";
}

export function courseSchema({
  course,
  locale,
  slug,
}: {
  course: any;
  locale: string;
  slug: string;
}) {
  const pageUrl = getPageUrl(locale, `/courses/${slug}`);
  const title = getSchemaText(course?.title, locale);
  const description = getSchemaText(course?.description, locale);
  const instructorName = getSchemaText(course?.instructor?.name, locale);
  const level = getSchemaText(course?.level, locale);
  const duration = getSchemaText(course?.duration, locale);

  const whatYouLearn = Array.isArray(course?.WhatYouLearn)
    ? course.WhatYouLearn.map((item: any) => getSchemaText(item, locale)).filter(Boolean)
    : [];

  return {
    "@type": "Course",
    "@id": `${pageUrl}#course`,
    name: title,
    description,
    url: pageUrl,
    inLanguage: locale,
    provider: {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "LanguagesTutor",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/favicon.png`,
  },
},
creator: {
  "@type": "Person",
  name: instructorName || "Mohsin Ali",
  url: getPageUrl(locale, "/about"),
},
    educationalLevel: level || undefined,
    teaches: whatYouLearn.length ? whatYouLearn : undefined,
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      courseWorkload: duration || undefined,
      instructor: {
        "@type": "Person",
        name: instructorName || "Mohsin Ali",
      },
    },
  };
}

export function faqPageSchema({
  faqs,
  locale,
  path,
}: {
  faqs: any[];
  locale: string;
  path: string;
}) {
  const pageUrl = getPageUrl(locale, path);

  const validFaqs = Array.isArray(faqs)
    ? faqs
        .map((faq) => ({
          question: getSchemaText(faq?.question, locale),
          answer: getSchemaText(faq?.answer, locale),
        }))
        .filter((faq) => faq.question && faq.answer)
    : [];

  if (!validFaqs.length) return null;

  return {
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    mainEntity: validFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function videoObjectSchema({
  locale,
  path,
  name,
  description,
  thumbnailUrl,
  contentUrl,
}: {
  locale: string;
  path: string;
  name: string;
  description: string;
  thumbnailUrl?: string;
  contentUrl?: string;
}) {
  if (!contentUrl) return null;

  const pageUrl = getPageUrl(locale, path);

  return {
    "@type": "VideoObject",
    "@id": `${pageUrl}#video`,
    name,
    description,
    thumbnailUrl: thumbnailUrl ? [thumbnailUrl] : undefined,
    uploadDate: "2026-06-27",
    contentUrl,
    embedUrl: contentUrl,
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    inLanguage: locale,
  };
}

export function articleSchema({
  blog,
  locale,
  slug,
  imageUrl,
}: {
  blog: any;
  locale: string;
  slug: string;
  imageUrl?: string;
}) {
  const pageUrl = getPageUrl(locale, `/blog/${slug}`);

  const title = getSchemaText(blog?.title, locale);
  const description = getSchemaText(blog?.description, locale);
  const authorName = getSchemaText(blog?.writer?.name, locale) || "Mohsin Ali";
  const category = getSchemaText(blog?.blogCategory?.[0]?.title, locale);

  return {
    "@type": "Article",
    "@id": `${pageUrl}#article`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
    },
    headline: title,
    description,
    image: imageUrl ? [imageUrl] : undefined,
    datePublished: blog?.publishedAt || blog?.createdAt,
    dateModified: blog?.publishedAt || blog?.createdAt,
    author: {
      "@type": "Person",
      name: authorName,
      url: getPageUrl(locale, "/about"),
    },
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    articleSection: category || undefined,
    timeRequired: blog?.duration || undefined,
    inLanguage: locale,
  };
}

export function reviewsPageSchema({
  reviews,
  locale,
}: {
  reviews: any[];
  locale: string;
}) {
  const pageUrl = getPageUrl(locale, "/testimonials");

  const validReviews = Array.isArray(reviews)
    ? reviews
        .map((review) => {
          const userName = getSchemaText(review?.user, locale);
          const reviewText = getSchemaText(review?.comment, locale);
          const userCourse = getSchemaText(review?.userCourse, locale);
          const location = getSchemaText(review?.location, locale);

          const courseRef = review?.courseRefs?.[0];
          const courseTitle = getSchemaText(courseRef?.title, locale) || userCourse;
          const courseSlug =
            typeof courseRef?.slug === "string"
              ? courseRef.slug
              : courseRef?.slug?.current;

          if (!userName || !reviewText) return null;

          return {
            "@type": "Review",
            "@id": `${pageUrl}#review-${review?._id}`,
            author: {
              "@type": "Person",
              name: userName,
              address: location || undefined,
            },
            reviewBody: reviewText,
            datePublished: review?.createdAt || undefined,
            reviewRating: review?.rating
              ? {
                  "@type": "Rating",
                  ratingValue: review.rating,
                  bestRating: 5,
                  worstRating: 1,
                }
              : undefined,
            itemReviewed: courseTitle
              ? {
                  "@type": "Course",
                  name: courseTitle,
                  url: courseSlug
                    ? getPageUrl(locale, `/courses/${courseSlug}`)
                    : undefined,
                  provider: {
                    "@id": `${SITE_URL}/#organization`,
                  },
                }
              : {
                  "@id": `${SITE_URL}/#organization`,
                },
          };
        })
        .filter(Boolean)
    : [];

  if (!validReviews.length) return null;

  return {
    "@type": "ItemList",
    "@id": `${pageUrl}#reviews`,
    name:
      locale === "ar"
        ? "آراء طلاب LanguagesTutor"
        : "LanguagesTutor Student Reviews",
    itemListElement: validReviews.map((review, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: review,
    })),
  };
}


export function booksCollectionSchema({
  books,
  locale,
}: {
  books: any[];
  locale: string;
}) {
  const pageUrl = getPageUrl(locale, "/books");

  const validBooks = Array.isArray(books)
    ? books
        .map((book, index) => {
          const title = getSchemaText(book?.title, locale);
          const description = getSchemaText(book?.description, locale);
          const author = getSchemaText(book?.author, locale) || "Mohsin Ali";
          const language = getSchemaText(book?.language, locale);

          if (!title || !description) return null;

          return {
            "@type": "Book",
            "@id": `${pageUrl}#book-${index + 1}`,
            name: title,
            description,
            author: {
              "@type": "Person",
              name: author,
              url: getPageUrl(locale, "/about"),
            },
            publisher: {
              "@id": `${SITE_URL}/#organization`,
            },
            inLanguage: language || locale,
            url: pageUrl,
          };
        })
        .filter(Boolean)
    : [];

  if (!validBooks.length) return null;

  return {
    "@type": "CollectionPage",
    "@id": `${pageUrl}#books`,
    name:
      locale === "ar"
        ? "كتب تعلم اللغات | LanguagesTutor"
        : "Language Learning Books | LanguagesTutor",
    url: pageUrl,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: validBooks.map((book, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: book,
      })),
    },
  };
}