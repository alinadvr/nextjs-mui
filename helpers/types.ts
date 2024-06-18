export type Product = {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  price: number;
};

export type APIResponse<T> =
  | { isError: true; message: string; status: number }
  | { isError: false; data: T };
