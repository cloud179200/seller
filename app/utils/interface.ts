export interface IResponseSuccessObject<T = any> {
  data: T | Array<T> | boolean;
  message: string;
}

export interface IResponseErrorObject { error: number; message: string; }
