import { createTestContext } from './__helpers'

const ctx = createTestContext()

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

