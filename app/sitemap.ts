import { MetadataRoute } from "next";

import getProducts from "@/helpers/getProducts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const homePage: MetadataRoute.Sitemap[number] = {
    url: process.env.HOST ?? "",
    changeFrequency: "yearly",
    priority: 1,
  };
  const res = await getProducts();

  if (res.isError) return [homePage];

  return [
    homePage,
    ...res.data.products.map((product) => ({
      url: `${process.env.HOST}/${product.link}`,
      changeFrequency: "yearly",
      priority: 1,
    })),
  ] as MetadataRoute.Sitemap;
}
