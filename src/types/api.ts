export type Response<T> = {
  success: boolean;
  code: number;
  message: string;
  data?: T;
};

export type User = {
  id: number;
  username: string;
};
