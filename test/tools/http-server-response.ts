import { HttpHeaders } from "../../src/http-headers";

export class HttpServerResponse {
    constructor(
        public status: number,
        public body: any,
        public headers: HttpHeaders
    ) { }

    static build({ status, body, headers }: HttpServerResponse): HttpServerResponse {
        return new HttpServerResponse(status, body, headers);
    }
}