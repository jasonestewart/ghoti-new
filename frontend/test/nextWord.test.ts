import { createTestContext } from './__helpers'
import WordService, { Word }  from '../services/wordService';

const ctx = createTestContext()

it('should fetch a new word - graphql', async () => {
  const randomWord = `#graphql
query  Query {
  next {
    text
    words
  }
}
`;
  const data = await ctx.client.request(randomWord);
  expect(data).toBeTruthy();
  expect(data.next).toBeTruthy();
  expect(data.next).toBeTruthy();
  expect(data.next.words.length).toBeGreaterThan(1);
  expect(data.next.text).toBeTruthy();
});

it('should fetch a new word - wordService', async () => {

  const ws = new WordService();
  const nextWord : Word = await ws.nextWord();

  expect(nextWord).toBeTruthy();
  expect(nextWord.words.length).toBeGreaterThan(1);
  expect(nextWord.text).toBeTruthy();
});

