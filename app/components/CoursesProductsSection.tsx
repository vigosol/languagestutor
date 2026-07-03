import { getLocale, getTranslations } from "next-intl/server";
import { PrimaryLinkGradient } from "./common/PrimaryLinkGradient";
import { CourseCard } from "./CourseCard";
import { sanityClient } from "../lib/sanity";
import { languagesCoursesQuery } from "../lib/queries";
import { urlFor } from "../lib/sanityImage";

const getLocalizedText = (
  field: { en?: string; ar?: string } | string | undefined,
  locale: string,
  fallback: string = ""
) => {
  if (!field) return fallback;
  if (typeof field === "string") return field;
  return locale === "ar" ? field.ar || field.en || fallback : field.en || field.ar || fallback;
};

const getTotalLectures = (curriculum: any[] | null | undefined): number => {
  if (!curriculum || !Array.isArray(curriculum)) return 0;

  return curriculum.reduce((total: number, module: any) => {
    return total + (module.lectures?.length || 0);
  }, 0);
};

export default async function CoursesProductsSection() {
  const t = await getTranslations();
  const locale = await getLocale();

  const query = languagesCoursesQuery(locale);

  const languagesCourses = await sanityClient.fetch(
    query.query,
    query.params,
    { next: { revalidate: 300 } }
  );

  return (
    <section className="lg:py-[100px] py-10">
      <div className="w-full max-w-[1340px] md:px-5 px-4 mx-auto">
        <div className="w-full">
          <div className="mt-3">
            <div className="md:p-3">
              <div className="w-full">
                <div className="flex lg:flex-row flex-col items-start lg:items-center justify-between gap-6">
                  <div className="max-w-[1000px]">
                    <h3 className="lg:text-5xl text-28 font-semibold mb-4 text-neutral2">
                      <span>{t("courses-products-heading")}</span>
                    </h3>

                    <p className="md:text-lg text-base text-gray3">
                      <span>{t("courses-products-desc")}</span>
                    </p>
                  </div>
                </div>

                <div className="w-full mt-8">
                  <div className="w-full px-2 pt-2 pb-4 grid md:grid-cols-3 grid-cols-1 gap-4">
                    {languagesCourses.slice(0, 3).map((course: any) => (
                      <CourseCard
                        key={course._id}
                        href={`/courses/${course.slug}`}
                        img={urlFor(course?.mainImage).width(600).height(340).url()}
                        title={getLocalizedText(course?.title, locale, "Untitled Course")}
                        users={course?.purchasedCount}
                        rating={course?.review}
                        level={course?.level}
                        description={getLocalizedText(
                          course?.description,
                          locale,
                          "No description available"
                        )}
                        lessons={getTotalLectures(course?.curriculum)}
                        duration={course?.duration}
                      />
                    ))}
                  </div>
                </div>

                <div className="w-full flex items-center justify-center md:pt-10 pt-4">
                  <PrimaryLinkGradient href="/courses" className="text-base py-3">
                    {t("courses-products-link")}
                  </PrimaryLinkGradient>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}