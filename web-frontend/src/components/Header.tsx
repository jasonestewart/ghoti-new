import * as React from 'react';
import logo from '../assets/ghoti.png';

class Header extends React.Component {
    render() {
        return (
            <div id="header">
            <div id="logo">
                <img src={logo} alt='logo'/>
                <span className='mascot'>Your favorite anagram game</span>
            </div>
            <div className="mid_screen" id="timer">0:00</div>
            <div id="line" />
            </div>
        );
    }
};

export default Header;