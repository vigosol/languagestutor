import { sanityClient } from '@/app/lib/sanity';
import { notFound } from 'next/navigation';
import { allCoursesQuery, getSingleCourseQuery } from '@/app/lib/queries';
import CoursesDetails from './CoursesDetails';
import { buildMetadata, getLocalizedValue } from '@/app/lib/seo';
import JsonLd from "@/app/components/JsonLd";
import {
  courseSchema,
  faqPageSchema,
  breadcrumbSchema,
  webpageSchema,
  videoObjectSchema,
  getSchemaText,
} from "@/app/lib/schema";

interface CoursePageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: CoursePageProps) {
  const { slug, locale } = await params;

  const { query, params: queryParams } = getSingleCourseQuery(slug, locale);
  const course = await sanityClient.fetch(query, queryParams);

  if (!course) {
    return buildMetadata({
      locale,
      path: `/courses/${slug}`,
      fallbackTitle: 'Course | LanguagesTutor',
      fallbackDescription: 'Explore this online language course from LanguagesTutor.',
    });
  }

  return buildMetadata({
    locale,
    path: `/courses/${slug}`,
    seo: course,
    fallbackTitle: `${getLocalizedValue(course.title, locale, 'Course')} | LanguagesTutor`,
    fallbackDescription: getLocalizedValue(course.description, locale, 'Explore this online language course from LanguagesTutor.'),
  });
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug, locale } = await params;

  const { query, params: queryParams } = getSingleCourseQuery(slug, locale);
  const courseData = await sanityClient.fetch(query, queryParams);

  if (!courseData) {
    notFound();
  }

  const allCoursesQueryResult = allCoursesQuery(locale);
  const frequentlyCourses = await sanityClient.fetch(
    allCoursesQueryResult.query,
    allCoursesQueryResult.params
  );

  const isArabic = locale === "ar";
const coursePath = `/courses/${slug}`;

const courseTitle = getSchemaText(courseData?.title, locale);
const courseDescription = getSchemaText(courseData?.description, locale);

const faqSchema = faqPageSchema({
  faqs: courseData?.faqs || [],
  locale,
  path: coursePath,
});

const videoSchema = videoObjectSchema({
  locale,
  path: coursePath,
  name: courseTitle,
  description: courseDescription,
  thumbnailUrl: courseData?.video?.poster?.image,
  contentUrl: courseData?.video?.url,
});

const coursePageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    webpageSchema({
      locale,
      path: coursePath,
      title: `${courseTitle} | LanguagesTutor`,
      description: courseDescription,
    }),
    breadcrumbSchema(locale, [
      {
        name: isArabic ? "الرئيسية" : "Home",
        path: "/",
      },
      {
        name: isArabic ? "الدورات" : "Courses",
        path: "/courses",
      },
      {
        name: courseTitle,
        path: coursePath,
      },
    ]),
    courseSchema({
      course: courseData,
      locale,
      slug,
    }),
    faqSchema,
    videoSchema,
  ].filter(Boolean),
};

return (
  <>
    <JsonLd data={coursePageSchema} />
    <CoursesDetails
      course={courseData}
      frequentlyCourses={frequentlyCourses}
      locale={locale}
    />
  </>
);
}
