import * as React from 'react';
import GhotiModel from '../model/GhotiModel';

type MyProps = {
    model: GhotiModel,
}

type MyState = {
    wordLayout: React.ReactNode,
}

class Words extends React.Component<MyProps, MyState> {    
    constructor(props: MyProps) {
        super(props);
        this.state = {
            wordLayout: this.props.model.getWordLayout()
        };
    }
    render() {
        if (this.props.model.isNewWord()) {
            this.setState({wordLayout: this.props.model.getWordLayout()});
        }
        return (
            <div id="completed">
                {this.state.wordLayout} 
            </div>
        );
    }
};

export default Words;