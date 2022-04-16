import { GraphQLClient } from "graphql-request";
declare type TestContext = {
    client: GraphQLClient;
};
export declare function createTestContext(): TestContext;
export {};
