import JsonLd from "@/app/components/JsonLd";
import { breadcrumbSchema, webpageSchema } from "@/app/lib/schema";

type PageKey =
  | "about"
  | "courses"
  | "contact"
  | "books"
  | "testimonials"
  | "blog";

const staticPages = {
  about: {
    path: "/about",
    en: {
      title: "About LanguagesTutor | Learn Languages with Mohsin Ali",
      description:
        "Discover LanguagesTutor and meet founder Mohsin Ali. Learn Pashto, Arabic, and Urdu through practical, structured, and engaging online language courses.",
      breadcrumb: "About",
    },
    ar: {
      title: "منو LanguagesTutor | تعلّم مع الأستاذ محسن علي",
      description:
        "تعرّف على LanguagesTutor وعلى مؤسسها الأستاذ محسن علي، واكتشف دورات البشتو والعربي والأردي بأسلوب عملي وسهل يساعدك تتعلم بثقة.",
      breadcrumb: "من نحن",
    },
  },
  courses: {
    path: "/courses",
    en: {
      title: "Online Language Courses | Pashto, Arabic & Urdu | LanguagesTutor",
      description:
        "Browse online Pashto, Arabic, and Urdu courses for beginners, professionals, Quran learners, and advanced students. Live classes with expert instruction.",
      breadcrumb: "Courses",
    },
    ar: {
      title: "دورات اللغات أونلاين | البشتو والعربي والأردي",
      description:
        "اختر من مجموعة دورات البشتو والعربي والأردي أونلاين، سواء كنت مبتدئ أو تبغى تطور مستواك أو تتعلم قراءة القرآن مع مدرس متخصص.",
      breadcrumb: "الدورات",
    },
  },
  contact: {
    path: "/contact",
    en: {
      title: "Contact LanguagesTutor | Book Your Free Language Consultation",
      description:
        "Contact LanguagesTutor to book a free consultation or enroll in Pashto, Arabic, and Urdu courses. Start your language learning journey today.",
      breadcrumb: "Contact",
    },
    ar: {
      title: "تواصل مع LanguagesTutor | احجز استشارة مجانية",
      description:
        "تواصل مع فريق LanguagesTutor واحجز استشارة مجانية أو سجّل في دورات البشتو والعربي والأردي، وابدأ رحلتك في تعلم اللغات اليوم.",
      breadcrumb: "تواصل معنا",
    },
  },
  books: {
    path: "/books",
    en: {
      title: "Language Learning Books | Pashto, Arabic & Urdu Resources",
      description:
        "Explore language learning books and study resources for Pashto, Arabic, and Urdu. Improve reading, grammar, vocabulary, and communication skills.",
      breadcrumb: "Books",
    },
    ar: {
      title: "كتب تعلم اللغات | كتب البشتو والعربي والأردي",
      description:
        "تصفح كتب ومواد تعليمية للبشتو والعربي والأردي تساعدك تطور القراءة والقواعد والمفردات ومهارات التواصل بطريقة سهلة.",
      breadcrumb: "الكتب",
    },
  },
  testimonials: {
    path: "/testimonials",
    en: {
      title: "Student Success Stories | LanguagesTutor Reviews & Testimonials",
      description:
        "Read real student reviews from learners worldwide who improved their Pashto, Arabic, and Urdu skills with LanguagesTutor's online courses.",
      breadcrumb: "Testimonials",
    },
    ar: {
      title: "تجارب الطلاب | آراء وتقييمات LanguagesTutor",
      description:
        "شوف تجارب وآراء الطلاب من مختلف الدول اللي تعلموا البشتو والعربي والأردي مع LanguagesTutor وحققوا تقدم حقيقي في مهاراتهم.",
      breadcrumb: "آراء الطلاب",
    },
  },
  blog: {
    path: "/blog",
    en: {
      title: "Language Learning Blog | Pashto, Arabic & Urdu Tips",
      description:
        "Read expert articles, language learning guides, grammar tips, pronunciation lessons, and study resources for Pashto, Arabic, and Urdu learners.",
      breadcrumb: "Blog",
    },
    ar: {
      title: "مدونة تعلم اللغات | نصائح البشتو والعربي والأردي",
      description:
        "اقرأ مقالات ونصائح تساعدك تتعلم البشتو والعربي والأردي، وتطور مهاراتك في القراءة والمحادثة والقواعد والنطق خطوة بخطوة.",
      breadcrumb: "المدونة",
    },
  },
};

export default function StaticPageSchema({
  page,
  locale,
}: {
  page: PageKey;
  locale: string;
}) {
  const isArabic = locale === "ar";
  const pageData = staticPages[page];
  const content = isArabic ? pageData.ar : pageData.en;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      webpageSchema({
        locale,
        path: pageData.path,
        title: content.title,
        description: content.description,
      }),
      breadcrumbSchema(locale, [
        {
          name: isArabic ? "الرئيسية" : "Home",
          path: "/",
        },
        {
          name: content.breadcrumb,
          path: pageData.path,
        },
      ]),
    ],
  };

  return <JsonLd data={schema} />;
}