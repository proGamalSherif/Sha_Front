export interface ResponseWrapper<T> {
    isSuccess: boolean;
    message: string;
    data?: T;
}