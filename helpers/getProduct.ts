import { APIResponse, Product } from "@/helpers/types";

export default async function getProduct(
  link: string,
): Promise<APIResponse<Product>> {
  try {
    const res = await fetch(`${process.env.HOST}/api/products/${link}`, {
      next: { revalidate: 0 },
    });
    const data = await res.json();

    if (res.status === 200) return { isError: false, data };

    return {
      isError: true,
      status: res.status,
      message: data?.message ?? "Error happened on the server",
    };
  } catch (error) {
    return {
      isError: true,
      status: 500,
      message: "Error happened on the server",
    };
  }
}
