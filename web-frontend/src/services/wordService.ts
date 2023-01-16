import ALLWORDS from "../data/data";

export type Word = {
  text: string;
  words: string[];
};

class WordService {
  nextWord(): Word {
    const rndm = Math.floor(Math.random() * ALLWORDS.length);

    const word = ALLWORDS[rndm];
    const words = word.words;
    words.push(word.text);
    return { text: word.text, words: words };
};
}

export default WordService;
