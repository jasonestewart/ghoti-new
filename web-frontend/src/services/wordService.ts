import ALLWORDS from "../data/data";

export type Word = {
  text: string;
  words: string[];
};

class WordService {
  wordCount: number;
  constructor() {
    this.wordCount = ALLWORDS.length;
  }

  nextWord(): Word {
    const rndm = Math.floor(Math.random() * this.wordCount);

    const word = ALLWORDS[rndm];
    const words = word.words;
    words.push(word.text);
    return { text: word.text, words: words };
};
}

export default WordService;
