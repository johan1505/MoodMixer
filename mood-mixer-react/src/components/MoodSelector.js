import React, { Component } from 'react';
import ToggleBUtton from './ToggleButton';
import { FaSmile,  FaFrown, FaLaughSquint, FaSadCry, FaAngry} from 'react-icons/fa';


const buttons = [
    { state: 'happy', type: 'Happy', icon: <FaSmile className="icon"/>},
    { state: 'excited', type: 'Excited', icon:<FaLaughSquint className="icon"/>},
    { state: 'sad', type: 'Sad', icon: <FaFrown className="icon"/>},
    { state: 'depressed', type: 'Depressed', icon:<FaSadCry className="icon"/>},
    { state: 'upset', type: 'Upset', icon:<FaAngry className="icon"/>},
]

class MoodSelector extends Component {
    
    render() {
        return (
            <div className="selector fadeIn">
                {buttons.map((button, index) => (
                    <ToggleBUtton 
                        getState={() => this.props.getState(button.state)} 
                        onClickToggleButton={()=>this.props.toggle(button.state)} 
                        type={button.type} 
                        key = {index}
                        icon={button.icon}
                    >
                    </ToggleBUtton>
                ))}
            </div>
        );
    }
}

export default MoodSelector;