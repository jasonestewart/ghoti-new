import WordService, { Word } from '../services/wordService';
import React from 'react';

export enum Guess {
    BAD_GUESS,
    ALREADY_GUESSED,
    GOOD_GUESS
}

class GhotiModel {
    __service: WordService;
    __currentWord!: string;
    __availableLetters!: string[];
    __guessedLetters!: string[];
    __currentWordList!: string[];
    __guessedWordList!: string[];
    __word!: Word;
    __score: number;
    __round: number;
    __success: boolean;
    __isNewWord: boolean;
    __wordLayout: React.ReactNode;
    EMPTY = '';

    constructor() {
        this.__service = new WordService();
        this.__score = 0;
        this.__round = 1;
        this.__success = false;
        this.__isNewWord = false;
    }

    // simple getters
    getScore(){
        return this.__score;
    }
    getRound(){
        return this.__round;
    }
    getCurrentWord(): string {
        return this.__currentWord;
    }
    getAvailableLetters(): string[] {
        return this.__availableLetters;
    }
    getGuessedLetters(): string[] {
        return this.__guessedLetters;
    }
    getCurrentWordList(): string[] {
        return this.__currentWordList;
    }
    getGuessedWordList(): string[] {
        return this.__guessedWordList;
    }
    getGuessedWord(){
        return this.__guessedLetters.join('');
    }
    getWordLayout(){
        return this.__wordLayout;
    }

    async newRound() {
        this.__round++;
        this.__success = false;
        await this.fetchNewWord();
    }

    restart() {
        this.__round = 0;
        this.__score = 0;
        this.newRound();
    }

    // setting up a new word from the word service
    async fetchNewWord() {
        this.__word = await this.__service.nextWord();
        this.__currentWord = this.__word.text.toUpperCase();
        this.__currentWordList = this.__word.words.map((word) => word.toUpperCase());

        // the 7-letter word must be added to the word list
        if (-1 === this.__currentWordList.indexOf(this.__currentWord)) {
            this.__currentWordList.push(this.__currentWord);
        }
        this.__availableLetters = this.__currentWord.split('').sort(() => Math.random() - 0.5);
        this.__guessedLetters = [];
        this.__guessedWordList = [];
        this.initWordLayout();
        this.__isNewWord = true;
    }

    isNewWord() {
        return this.__isNewWord;
    }

    initWordLayout() {
        // store the <ul>s in an array before the return
		const completed: React.ReactNode[] = [];

        console.log('initWordLayout: found length: ', this.__currentWordList.length);

        // order the words by size
		var orderedWords: string[][] = [];
		for (let i=3; i <= 7; i++) {
			orderedWords[i] = [];
		}
		this.__currentWordList.forEach((word) => {
			orderedWords[word.length].push(word.toUpperCase());
		});
        orderedWords.forEach((array) => {
            // store the <li>s in an array before creating the <ul>
            let container: React.ReactNode[] = [];

			let count = 0;
			array.forEach((word) => {
                count++;

                if (count > 12) {
                    completed.push(React.createElement('div', null, container));
                    container = [];
                    count = 0;
                }
                // store the word for later rendering
                container.push(React.createElement('Word', {word: word, key: word}, completed));
			});
            completed.push(React.createElement('ul', null, container));
		});
        this.__wordLayout = React.createElement('div', null, completed);
	}
	
   // check if a letter is one of the available letters
    checkChar(char: string): boolean {
        return this.__availableLetters.indexOf(char) === -1 ? false : true;
    }

    // moves a letter from the letters list to the guesses list
    wordToGuess(char: string) {
        this.__guessedLetters.push(char); // add char to the end of guesses
        const index = this.__availableLetters.indexOf(char);
        this.__availableLetters[index] = this.EMPTY; // remove the first instance of char from letters
    }

    emptyGuessedLetters(){
        while (this.__guessedLetters.length !== 0) {
            this.undoPrevGuess();
        }	
    }

    undoPrevGuess(){
        // Remove from end of guess
        const letter = this.__guessedLetters.pop();
        let index = this.__guessedLetters.length;
        
        // Add to first free space of word
        index = this.__availableLetters.indexOf(this.EMPTY);
        // this.view.setWord(letter, index);
        this.__availableLetters[index] = letter!;
    }

    shuffle(){
        this.__availableLetters = this.__availableLetters.sort(() => Math.random() - 0.5);
    }

    isWord(word: string) {
        return word === this.__currentWord;
    }

    makeGuess(): Guess {
        const word = this.getGuessedWord();
        console.log("makeGuess: found word: ", word);
        this.emptyGuessedLetters();
        if (-1 !== this.__currentWordList.indexOf(word)) {
            if (-1 !== this.__guessedWordList.indexOf(word)) {
                console.log("makeGuess: already guessed");
                return Guess.ALREADY_GUESSED;
            } else {
                this.__guessedWordList.push(word);
                this.updateScore(word);
                console.log("makeGuess: good guess");          
                return Guess.GOOD_GUESS;
            }
        } else {
            console.log("makeGuess: bad guess");      
            return Guess.BAD_GUESS;
        }
    }
    updateScore(word: string) {
        this.__score += this.scoreWord(word);

        // if we guess the 7-letter word,
        // or if we guess > 2/3 of the words: we succeed
        if (this.isWord(word)) {
            this.__success = true;
        } else if (this.getPercent() > 0.66) {
            this.__success = true;
        }
    }
    getPercent(): number {
        return this.__guessedWordList.length / this.__currentWordList.length;
    }
    scoreWord(word: string): number {
        return word.length;
    }
    isFinished() {
        return this.__guessedWordList.length === this.__currentWordList.length;
    }
    isSuccess() {
        return this.__success;
    }
}

export default GhotiModel;