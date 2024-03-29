import Letters from "./Letters";
import Score from "./Score";
import GhotiModel from "../model/GhotiModel";

type MyProps = {
    model: GhotiModel;
};

const ScoreCard = ({ model }: MyProps) => {
    return (
        <div id="type_area" className="flex">
            <Score
                score={model.getScore()}
                percent={Math.floor(model.getPercent() * 100)}
                round={model.getRound()}
            />
            <Letters prefix="avail" letters={model.getAvailableLetters()} />
            <Letters prefix="guess" letters={model.getGuessedLetters()} />
        </div>
    );
};

export default ScoreCard;
