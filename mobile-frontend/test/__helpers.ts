import { GraphQLClient } from "graphql-request";

type TestContext = {
  client: GraphQLClient;
};

export function createTestContext(): TestContext {
  let ctx = {} as TestContext;

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
function graphqlTestContext() {
  return {
    async before() {
      const port = 4000;
      return new GraphQLClient(`http://localhost:${port}`);
    },

    async after() {
    },
  };
}