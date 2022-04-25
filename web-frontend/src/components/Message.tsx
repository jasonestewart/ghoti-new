import * as React from 'react';

type MyProps = {
    message: string
}

class Message extends React.Component<MyProps, {}> {
    render() {
        if (this.props.message === "") {
            return (null);
        }

        return (
            <div>
                <span className='message'>{this.props.message}</span>
            </div>
        );
    }
};

export default Message;