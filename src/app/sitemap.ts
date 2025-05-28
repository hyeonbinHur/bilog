import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // const sql = `${process.env.NEXT_PUBLIC_BASE_URL}/post?&all=${true}`;
  // const response = await fetch(sql);
  // const data = await response.json();

  // if (!response.ok) {
  //   throw new Error("Failed to read posts");
  // }

  // const postDirections = data.posts.map((e: any) => ({
  //   url: `${process.env.NEXT_PUBLIC_BLOG_URL}/${e.post_id}`,
  //   lastModified: new Date(),
  //   changeFrequency: "daily",
  //   priority: 1,
  // }));

  return [
    {
      url: "https://www.h-bilog.online/",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: "https://www.h-bilog.online/about",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: "https://www.h-bilog.online/blog",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    // ...postDirections,
  ];
}

// import { MetadataRoute } from "next";

// export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
//   return [
//     {
//       url: "https://www.h-bilog.online/",
//       lastModified: new Date(),
//       changeFrequency: "daily",
//       priority: 0.8,
//     },
//     {
//       url: "https://www.h-bilog.online/about",
//       lastModified: new Date(),
//       changeFrequency: "daily",
//       priority: 0.8,
//     },
//     {
//       url: "https://www.h-bilog.online/blog",
//       lastModified: new Date(),
//       changeFrequency: "daily",
//       priority: 0.8,
//     },
//   ];
// }
