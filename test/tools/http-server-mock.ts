import { createServer, IncomingMessage, Server, ServerResponse } from "http";
import { Socket } from "net";
import { HttpMethod } from "../../src/http-method";
import { HttpServerRequest } from "./http-server-request";
import { HttpServerResponse } from "./http-server-response";

export class HttpServerMock {
    private server: Server;
    private requestsResponses = new Map<string, HttpServerResponse>();
    private sockets = new Set<Socket>();

    constructor(private readonly port: number) {
        this.server = createServer((req: IncomingMessage, res: ServerResponse) => {
            let data = '';
            req.on('data', chunk => { data += chunk; });

            req.on('end', () => {
                const httpServerRequest = HttpServerRequest.build({
                    url: req.url || '',
                    method: HttpMethod[req.method as HttpMethod],
                });
                const response = this.requestsResponses.get(JSON.stringify(httpServerRequest));

                if (response) {
                    for (const key in response.headers) res.setHeader(key, response.headers[key]);
                    res.statusCode = response.status;
                    res.end(JSON.stringify(response.body));
                } else {
                    res.statusCode = 404;
                    res.end();
                }
            })
        });

        this.server.listen(this.port, () => {
            console.log(`===HttpServerMock is listening on port: ${this.port}...===`);
        });

        this.server.on('connection', (socket) => {
            this.sockets.add(socket);

            this.server.once('close', () => {
                this.sockets.delete(socket);
            });
        });
    }

    on(req: HttpServerRequest, res: HttpServerResponse) {
        this.requestsResponses.set(JSON.stringify(req), res);
    }

    stop() {
        console.log('===HttpServerMock is shutting down...===');
        this.sockets.forEach((socket: Socket) => {
            socket.destroy();
            this.sockets.delete(socket);
        });
        this.server.close()
    }
}
