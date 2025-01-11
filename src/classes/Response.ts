import { Response as ResponseT } from "../types/api";

export class ResponseHandler<T> implements ResponseT<T> {
  constructor(
    public success: boolean,
    public code: number,
    public message: string,
    public data?: T,
  ) {}
}
