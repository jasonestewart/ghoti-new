"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __helpers_1 = require("./__helpers");
const ctx = (0, __helpers_1.createTestContext)();
it('should fetch all the words', async () => {
    const getWords = `#graphql
query  Query {
  list {
    text
  }
}
`;
    const data = await ctx.client.request(getWords);
    expect(data).toBeTruthy();
    expect(data.list).toBeTruthy();
    expect(data.list.length).toBe(10035);
});
