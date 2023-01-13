type MyProps = {
    score: number;
    percent: number;
    round: number;
};

const Score = ({ score, percent, round }: MyProps) => {
    return (
        <div id="game_info">
            <div id="score">
                <span className="label">Score: </span>
                <span className="value">{score}</span>
            </div>
            <div id="percent">
                <span className="label">Percent: </span>
                <span className="value">{percent}%</span>
            </div>
            <div id="roundNum">
                <span className="label">Round: </span>
                <span className="value">{round}</span>
            </div>
        </div>
    );
};

export default Score;
