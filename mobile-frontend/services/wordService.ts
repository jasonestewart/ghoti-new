import { GraphQLClient } from "graphql-request";

export type Word = { 
    text: string; 
    words: Array<string | null>;
};

export type Query = { // field return type name
    next: Word
};

class WordService {
    __port = 4000;
    __host = '192.168.1.182';
    // __url = `${this.__host}:${this.__port}`;
    __url = 'https://ghoti-backend.herokuapp.com/';
    __client : GraphQLClient;
    __nextWord = `#graphql
    query  Query {
      next {
        text
        words
      }
    }
    `;
    
    constructor() {
        console.log("Constructing service");
        this.__client = new GraphQLClient(`${this.__url}`);
    }

    async nextWord () : Promise<Word> {
        console.log("in nextWord");
        const query : Query = await this.__client.request(this.__nextWord);
        console.log("Found word: ", query);
        return query.next;
    }
}

export default WordService;
