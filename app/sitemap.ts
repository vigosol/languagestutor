import type { MetadataRoute } from "next";
import { SITE_URL } from "./lib/seo";
import { sanityClient } from "./lib/sanity";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    "",
    "/about",
    "/contact",
    "/books",
    "/testimonials",
    "/blog",
    "/courses",
  ];

  const staticUrls = [
    ...staticPages.map((path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...staticPages.map((path) => ({
      url: `${SITE_URL}/ar${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
  ];

  const blogs = await sanityClient.fetch(`
    *[_type == "blog" && defined(slug.current)]{
      "slug": slug.current,
      updatedAt,
      publishedAt
    }
  `);

  const courses = await sanityClient.fetch(`
    *[_type == "course" && defined(slug.current)]{
      "slug": slug.current,
      updatedAt,
      publishedAt
    }
  `);

  const blogUrls = [
    ...blogs.map((blog: any) => ({
      url: `${SITE_URL}/blog/${blog.slug}`,
      lastModified: blog.updatedAt || blog.publishedAt || new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...blogs.map((blog: any) => ({
      url: `${SITE_URL}/ar/blog/${blog.slug}`,
      lastModified: blog.updatedAt || blog.publishedAt || new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];

  const courseUrls = [
    ...courses.map((course: any) => ({
      url: `${SITE_URL}/courses/${course.slug}`,
      lastModified: course.updatedAt || course.publishedAt || new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...courses.map((course: any) => ({
      url: `${SITE_URL}/ar/courses/${course.slug}`,
      lastModified: course.updatedAt || course.publishedAt || new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
  ];

  return [...staticUrls, ...courseUrls, ...blogUrls];
}