import { Empty } from "./empty";

export type ApiResponse<T> = {
    value: T | Empty,
    errors: string[],
    success: boolean
}
