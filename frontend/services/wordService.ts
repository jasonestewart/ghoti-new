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
    __host = '192.168.1.182'
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
        this.__client = new GraphQLClient(`http://${this.__host}:${this.__port}`);
    }

    async nextWord () : Promise<Word> {
        console.log("in nextWord");
        const query : Query = await this.__client.request(this.__nextWord);
        console.log("Found word: ", query);
        return query.next;
    }
}

export default WordService;
