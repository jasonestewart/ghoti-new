import { createTestContext } from './__helpers'

const ctx = createTestContext()

it('should fetch all the words', async () => {
      const getWords = `#graphql
query  Query {
  list {
    text
  }
}
`;
  const data  = await ctx.client.request(getWords);
  expect(data).toBeTruthy();
  expect(data.list).toBeTruthy();
  expect(data.list.length).toBe(10035);
});

