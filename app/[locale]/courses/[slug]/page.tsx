import { sanityClient } from '@/app/lib/sanity';
import { notFound } from 'next/navigation';
import { allCoursesQuery, getSingleCourseQuery } from '@/app/lib/queries';
import CoursesDetails from './CoursesDetails';
import { buildMetadata, getLocalizedValue } from '@/app/lib/seo';

interface CoursePageProps {
  params: {
    locale: string;
    slug: string;
  };
}

export async function generateMetadata({ params }: CoursePageProps) {
  const { slug, locale } = params;
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
  const { slug, locale } = params;

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

  return (
    <CoursesDetails
      course={courseData}
      frequentlyCourses={frequentlyCourses}
      locale={locale}
    />
  );
}
