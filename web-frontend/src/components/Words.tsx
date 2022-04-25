import * as React from 'react';
import GhotiModel from '../model/GhotiModel';
import Word from './Word';

type MyProps = {
    model: GhotiModel,
    finished: boolean
}

// type MyState = {
//     wordLayout: React.ReactNode,
// }

class Words extends React.Component<MyProps, {}> {    
    makeWordLayout() {
        // store the <ul>s in an array before the return
		const completed: React.ReactNode[] = [];
        const wordList: string[] = this.props.model.getCurrentWordList();

        // order the words by size
		var orderedWords: string[][] = [];
		for (let i=3; i <= 7; i++) {
			orderedWords[i] = [];
		}
		wordList.forEach((word) => {
			orderedWords[word.length].push(word.toUpperCase());
		});
        
        // now that they're ordered, make columns of words
        orderedWords.forEach((array) => {
            // store the <li>s in an array before creating the <ul>
            let container: React.ReactNode[] = [];

			let count = 0;
			array.forEach((word) => {
                count++;

                if (count > 12) {
                    completed.push(<ul>{container}</ul>);
                    container = [];
                    count = 0;
                }
                // store the word for later rendering
                container.push(<Word finished={this.props.finished} word={word} key={word} hidden={!this.props.model.isAlreadyGuessed(word)} />);
			});
            completed.push(<ul>{container}</ul>);
		});
        return <div>{completed}</div>
    }
    render() {
        return (
            <div id="completed">
                {this.makeWordLayout()}
            </div>
        );
    }
};

export default Words;