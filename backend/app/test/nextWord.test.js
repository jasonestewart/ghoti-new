"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __helpers_1 = require("./__helpers");
const ctx = (0, __helpers_1.createTestContext)();
it('should fetch a new word', async () => {
    const nextWord = `#graphql
query  Query {
  next {
    text
    words
  }
}
`;
    const data = await ctx.client.request(nextWord);
    expect(data).toBeTruthy();
    expect(data.next).toBeTruthy();
    expect(data.next).toBeTruthy();
    expect(data.next.words.length).toBeGreaterThan(1);
    expect(data.next.text).toBeTruthy();
});
