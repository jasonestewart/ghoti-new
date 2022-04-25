import * as React from 'react';

type MyProps = {
}

class StartInfo extends React.Component<MyProps, {}> {
    render() {
        return (
            <div id="text_wrap">
			<div id="indent_wrap">
				<h3>Ready to play?!</h3>
				<p>Pass a level: Get the seven letter word and/or get more than 65% of the words.</p>
				<a href="ghoti.html"><div id="start">
					<span>play</span>
				</div></a>
			</div>
			<h3>Your influence</h3>
			<p>This game provided to you, open source, by a father/daughter duo, who simply wanted this game and made it.</p>
			<p>Play with us - How can this game improve, how will you effect the next step this game takes towards being your favorite? We can't wait to find out!</p>
			<p>Don't got ideas? This method is also a great support:</p>

		</div>
        );
    }
};

export default StartInfo;