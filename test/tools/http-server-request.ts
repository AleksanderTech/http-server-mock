import { HttpMethod } from "../../src/http-method";

export class HttpServerRequest {
    constructor(
        public url: string,
        public method: HttpMethod) { }

    static build({ url, method }: HttpServerRequest): HttpServerRequest {
        return new HttpServerRequest(url, method );
    }
}
