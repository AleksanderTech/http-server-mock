import { HttpClient } from "../../src/http-client";
import { HttpMethod } from "../../src/http-method";
import { Env } from "../env";
import { HttpServerMock } from "../tools/http-server-mock";
import { ApiResponse } from "../../src/api-response";
import { expect } from 'chai';

describe('HttpClient', () => {
    const ENDPOINT = '/api/test';
    let server: HttpServerMock;
    let httpClient: HttpClient;

    before(() => {
        server = new HttpServerMock(Number(new URL(Env.baseUrl).port));
    });

    after(() => {
        server.stop();
    });

    beforeEach(() => {
        httpClient = new HttpClient(Env.baseUrl);
    });

    it('returns correct structure on proper http get request', async () => {
        const body = {
            errors: [],
            success: true,
            value: {
                data: "Let's go!"
            }
        } as ApiResponse<{ data: string }>;
        server.on(
            {
                url: `/${ENDPOINT}`,
                method: HttpMethod.GET
            },
            {
                status: 200,
                body,
                headers: {
                    x: 'y'
                }
            }
        );

        const actual = await httpClient.request<{ data: string }>(ENDPOINT, HttpMethod.GET);
        expect(actual).to.be.eql(body);
        expect(actual.errors).to.be.eql([]);
        expect(actual.success).to.be.eql(true);
    })
})
