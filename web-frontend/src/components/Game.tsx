import * as React from 'react';
import ScoreCard from './ScoreCard';
import Words from './Words';
import GhotiModel, { Guess } from '../model/GhotiModel';
import Message from './Message';

type MyProps = {
    model: GhotiModel
}

type MyState = {
    paused: boolean,
    finished: boolean,
    lastKeyPressed: string,
    message: string
}

class Game extends React.Component<MyProps, MyState> {
    EMPTY = '';
    timer!: HTMLDivElement;
    GAME_TIME = 10;
    totalSecs!: number;
    timerID = 'timer';
    __init = false;

    constructor(props: MyProps) {
        super(props);
        this.state = {
            paused: false,
            finished: false,
            lastKeyPressed: '',
            message: ''
        };
        if (!this.__init) {
            this.timer = document.getElementById(this.timerID) as HTMLDivElement;
            this.CreateTimer(this.GAME_TIME);
            this.__init = true;
        }
    }
	
    render() {
        const paused = this.state.paused ? <span>Your Game is paused</span> : null;
        let newRound = <span></span>;
        if (this.state.finished) {
            if (this.props.model.isSuccess()) {
                newRound = <button onClick={this.nextRound}>Proceed</button>;
            } else {
                newRound = <button onClick={this.restart}>Restart</button>;
            }
        }

        return (
            <div>
                {paused}
                <Message message={this.state.message} />
                {newRound}
                <Words model={this.props.model} />
                <br className='clear' />
                <ScoreCard 
                    model={this.props.model} />
            </div>
        );
    }

    componentDidMount() {
        // @ts-ignore
        window.addEventListener("keydown", this.handleKeyPress);
        console.log("mounting listener");
      }
    
    componentWillUnmount() {
        // @ts-ignore
        window.removeEventListener("keydown", this.handleKeyPress);
        console.log("unmounting listener");
    }

    restart = () => {
        this.props.model.restart();

        this.CreateTimer(this.GAME_TIME);
    }
    
    nextRound = async () => {
        await this.props.model.newRound();

        this.CreateTimer(this.GAME_TIME);
    }

    timeIsUp = () => {
        this.showAll(this.props.model.getCurrentWordList(), this.props.model.getGuessedWordList());
        let msg = '';
        if (this.props.model.isSuccess()) {
            msg = "Congrats, you've made it to round " + (this.props.model.getRound() + 1);
        } else {
            msg = "Too bad, Game over!";
        }
        this.setState({
            paused: true,
            finished: true,
            message: msg
        });
    }

    UpdateTimer = () => {
        const Minutes = Math.floor(this.totalSecs / 60);
        this.totalSecs -= Minutes * (60);

        const timeStr = Minutes + ":" + this.LeadingZero(this.totalSecs);

        this.timer.innerHTML = timeStr;
        // console.log("UpdateTimer: calling for secs: ", this.totalSecs);
    }


    LeadingZero = (time: number) => {
        return (time < 10) ? "0" + time : + time;
    }

    CreateTimer = (time: number) => {
        this.totalSecs = time;
        
        this.UpdateTimer();
        window.setTimeout(this.Tick, 1000);
    }

    Tick = () => {
        if (this.totalSecs <= 0) {
            this.timeIsUp();
        } else {
            if (!this.state.paused) {
                this.totalSecs -= 1;
            }
            this.UpdateTimer();
            window.setTimeout(this.Tick, 1000);
        }
    }

    // make all the words visible
    showAll(dictionary: string[], guessed: string[]) {
        for (var i = 0; i < dictionary.length; i++) {
            var word = dictionary[i];
            if(guessed.indexOf(word) === -1) {
                this.addCompleted(word);
                var div = document.getElementById(word);
                div!.className = "red";
            }
        }
    }

    // if a word is successfully guessed we make it visible
    addCompleted(word: string) {
		var li = document.getElementById(word);
		var letters = li!.childNodes;
		for (var i = 0; i < letters.length; i++) {
			const div1 = letters[i];
			const div2 = div1.firstChild as HTMLDivElement;
			div2!.style.visibility = "visible";
		}
	};

    // backspace removes the previous letter from the guess
    handleBackspace() {
        this.props.model.undoPrevGuess();
    }

    // tab shuffles the letters
    handleTab() {
        this.props.model.shuffle();
    }
    checkGuess() {
        const word = this.props.model.getGuessedWord();
        const result = this.props.model.makeGuess();
        if (result === Guess.BAD_GUESS) {
            this.playBadSound();
        } else if (result === Guess.ALREADY_GUESSED) {
                this.playOldSound();
        } else {
            this.playGoodSound();
            this.addCompleted(word);
        }
    }
    playBadSound() {
        console.log('playBadSound: Method not implemented.');
    }
    playOldSound() {
        console.log('playOldSound: Method not implemented.');
    }
    playGoodSound() {
        console.log('playGoodSound: Method not implemented.');
    }
    

    // enter guesses a word
    handleEnter() {
        // Check guess
        this.checkGuess();
            
      if (this.props.model.isFinished()) {
          this.nextRound();
      }

    }

    // escape toggles the game paused state
    handleEsc = () => {
        this.setState({paused: !this.state.paused});
    }

    // the main key event callback
    handleKeyPress = (event: React.KeyboardEvent) => {
        event.preventDefault();

        const key = event.key;
        this.setState({lastKeyPressed: `key: ${key}`});

        if (key === "Escape") {
            this.handleEsc();
        } else if (!this.state.paused) {
            if (key === "Backspace") {
                this.handleBackspace();
            } else if (key === "Enter") {
                this.handleEnter();
            } else if (key === "Tab") {
                this.handleTab();
            } else {
                const char = key.toUpperCase();
                if (this.props.model.checkChar(char)) {
                    this.props.model.wordToGuess(char);
                }
            }
        }
    }


    alert_message(message: string) {
        const fade: HTMLDivElement = document.createElement('div');
        fade.setAttribute('class', 'fade-in');
        fade.style.display = 'block';

        const mh: HTMLDivElement = document.createElement('div');
        mh.setAttribute('id', 'message-holder');
        mh.style.opacity = '0';
        fade.appendChild(mh);

        var p = document.createElement('p');
        p.innerHTML = message;
        mh.appendChild(p);
        document.body.insertBefore(fade, document.getElementById('background'));
        this.anim_in(mh, 0);
    }
    anim_out = (ele: HTMLDivElement, op: number) => {
        op = op - 0.1;
        ele.style.opacity = op.toString();
        if(op > 0){
            setTimeout(() => {this.anim_out(ele, op)},100);
        } else {
            ele.style.opacity = '0';
        }
    }
    anim_in = (ele: HTMLDivElement, op: number) => {
        op = op + 0.1;
        ele.style.opacity = op.toString();
        if (op < 1) {
            setTimeout(() => {this.anim_in(ele, op)},100);
        } else {
            ele.style.opacity = '1';
            setTimeout(() => {this.anim_out(ele, op)},10000);
        }	
    }


    
};
export default Game;