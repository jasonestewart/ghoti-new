"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTestContext = void 0;
const get_port_1 = __importDefault(require("get-port"));
const graphql_request_1 = require("graphql-request");
const app_1 = require("../app/app");
function createTestContext() {
    let ctx = {};
    const graphqlCtx = graphqlTestContext();
    beforeEach(async () => {
        const client = await graphqlCtx.before();
        Object.assign(ctx, {
            client,
        });
    });
    afterEach(async () => {
        await graphqlCtx.after();
    });
    return ctx;
}
exports.createTestContext = createTestContext;
function graphqlTestContext() {
    let serverInstance = null;
    return {
        async before() {
            const port = await (0, get_port_1.default)();
            serverInstance = await app_1.server.listen({ port });
            return new graphql_request_1.GraphQLClient(`http://localhost:${port}`);
        },
        async after() {
            serverInstance === null || serverInstance === void 0 ? void 0 : serverInstance.server.close();
        },
    };
}
