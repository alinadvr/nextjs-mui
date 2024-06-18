import { APIResponse, Product } from "@/helpers/types";

export default async function getProducts(options?: {
  skip?: number;
  take?: number;
}): Promise<APIResponse<{ products: Product[]; count: number }>> {
  try {
    const res = await fetch(
      `${process.env.HOST}/api/products${options ? "?" : ""}${
        options?.skip ? `skip=${options.skip}&` : ""
      }${options?.take ? `take=${options.take}` : ""}`,
      {
        next: { revalidate: 0 },
      },
    );
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
