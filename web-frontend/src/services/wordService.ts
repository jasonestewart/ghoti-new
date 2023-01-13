import { GraphQLClient } from "graphql-request";

export type Word = {
  text: string;
  words: string[];
};

export type Query = {
  // field return type name
  next: Word;
};

class WordService {
  __port = 4000;
  __host = "http://localhost";
  __url = `${this.__host}:${this.__port}`;
  // __url = 'https://ghoti-backend.herokuapp.com/';
  __client: GraphQLClient;
  __nextWord = `#graphql
    query  Query {
      next {
        text
        words
      }
    }
    `;

  constructor() {
    this.__client = new GraphQLClient(`${this.__url}`);
  }

  async nextWord(): Promise<Word> {
    const query: Query = await this.__client.request(this.__nextWord);
    const word = query.next;
    const words = word.words;
    words.push(word.text);
    return { text: word.text, words: words };
  }
}

export default WordService;
