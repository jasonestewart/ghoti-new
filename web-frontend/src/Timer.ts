class Timer {
    totalSecs: number;
    timer!: HTMLDivElement;
    callback!: () => void;
    constructor() {
        this.totalSecs = 0;
    }

    UpdateTimer = () => {
        var Seconds = this.totalSecs;

        var Minutes = Math.floor(Seconds / 60);
        Seconds -= Minutes * (60);

        var timeStr = Minutes + ":" + this.LeadingZero(Seconds)

        this.timer.innerHTML = timeStr;
    }


    LeadingZero = (time: number) => {
        return (time < 10) ? "0" + time : + time;
    }

    CreateTimer = (timerID: string, time: number, callback: () => void) => {
        this.timer = document.getElementById(timerID) as HTMLDivElement;
        this.totalSecs = time;
        this.callback = callback;
        
        this.UpdateTimer();
        window.setTimeout(this.Tick, 1000);
    }

    Tick = () => {
        if (this.totalSecs <= 0) {
            this.callback();
        } else {
            this.totalSecs -= 1;
            this.UpdateTimer();
            window.setTimeout(this.Tick, 1000);
        }
    }
}

export default Timer;