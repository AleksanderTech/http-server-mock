import { HttpMethod } from "./http-method";
import { ApiResponse } from "./api-response";
import { AppErrors } from "./app-errors";

export class HttpClient {
    constructor(
        private readonly baseUrl: string
    ) { }

    async request<T>(url: string, method: HttpMethod, data?: any, headers = {}): Promise<ApiResponse<T>> {
        try {
            const response = await fetch(`${this.baseUrl}/${url}`, { method, headers, body: JSON.stringify(data) })
            const json = await response.json();
            return {
                errors: json.errors,
                success: json.success,
                value: json.value
            } as ApiResponse<T>
        } catch (_) {
            return {
                errors: [AppErrors.UNKNOWN_ERROR],
                success: false,
                value: {}
            } as ApiResponse<T>
        }
    }
}
