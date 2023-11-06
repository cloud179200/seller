export interface IResponseSuccessObject<T> {
  data: T | Array<T> | boolean;
  message: string;
}

export interface IResponseErrorObject { error: number; message: string; }
