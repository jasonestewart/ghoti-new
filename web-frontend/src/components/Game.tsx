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
    lastLetter: string,
    timeStr: string,
    message: string
}

class Game extends React.Component<MyProps, MyState> {
    EMPTY = '';
    GAME_TIME = 120;
    goodSound: HTMLAudioElement;
    badSound: HTMLAudioElement;
    oldSound: HTMLAudioElement;

    constructor(props: MyProps) {
        super(props);
        this.state = {
            paused: false,
            finished: false,
            message: '',
            timeStr: '',
            lastLetter: ''
        };
        this.CreateTimer();

        this.goodSound = new Audio('/goodSound.mp3');
        this.badSound = new Audio('/badSound.mp3');
        this.oldSound = new Audio('/oldSound.mp3');
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
            <div className='clearfix'>
                <div className="" id="timer">{this.state.timeStr}</div>
                {paused}
                <Message message={this.state.message} />
                {newRound}
                <Words model={this.props.model} finished={this.state.finished} />
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
        this.setState({
            paused: false,
            finished: false,
            message: ''
        });

        this.CreateTimer();
    }
    
    nextRound = async () => {
        await this.props.model.newRound();
        this.setState({
            paused: false,
            finished: false,
            message: ''
        });

        this.CreateTimer();
    }

    timeIsUp = () => {
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

    UpdateTimer = (secs: number) => {
        if (this.state.paused) {
            this.setState({timeStr: 'PAUSED'});
            console.log('timer is paused');
        } else {
            const minutes = Math.floor(secs / 60);
            const seconds = secs - (minutes * (60));

            this.setState({timeStr: minutes + ":" + this.LeadingZero(seconds)});
        }

        console.log("UpdateTimer: calling for secs: ", secs);
    }


    LeadingZero = (time: number) => {
        return (time < 10) ? "0" + time : + time;
    }

    CreateTimer = () => {
        this.UpdateTimer(this.GAME_TIME);
        setTimeout(() => this.Tick(this.GAME_TIME), 1000);
    }

    Tick = (time: number) => {
        if (time <= 0) {
            this.timeIsUp();
        } else {
            if (!this.state.paused) {
                time -= 1;
            }
            if (!this.state.finished) {
                this.UpdateTimer(time);
                setTimeout(() => this.Tick(time), 1000);
            }
        }
    }

    // backspace removes the previous letter from the guess
    handleBackspace() {
        this.props.model.undoPrevGuess();
    }

    // tab shuffles the letters
    handleTab() {
        this.props.model.shuffle();
    }
    checkGuess() {
        const result = this.props.model.makeGuess();
        if (result === Guess.BAD_GUESS) {
            this.playBadSound();
        } else if (result === Guess.ALREADY_GUESSED) {
                this.playOldSound();
        } else {
            this.playGoodSound();
        }
    }
    playBadSound() {
        this.badSound.play();
    }
    playOldSound() {
        this.oldSound.play();
    }
    playGoodSound() {
        this.goodSound.play();
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
        console.log("setting paused: ", this.state.paused);
    }

    // delete cheats
    handleDel = () => {
        this.setState({message: 'Your word is: '+this.props.model.getCurrentWord()});
        console.log("setting paused: ", this.state.paused);
    }

    // the main key event callback
    handleKeyPress = (event: React.KeyboardEvent) => {
        event.preventDefault();

        const key = event.key;
        this.setState({lastLetter: key});
        
        if (key === "Escape") {
            this.handleEsc();
        } else if (key === "Delete") {
            this.handleDel();
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