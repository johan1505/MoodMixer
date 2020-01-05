import React, { Component } from 'react';
import ToggleBUtton from './ToggleButton';
import { FaSmile,  FaFrown, FaLaughSquint, FaSadCry, FaAngry} from 'react-icons/fa';

class MoodSelector extends Component {
    render() {
        return (
            <div className="selector fadeIn">
                <ToggleBUtton getState={() => this.props.getState("happy")} onClickToggleButton={()=>this.props.toggle("happy")} type={"Happy"} icon={<FaSmile className="icon"/>}></ToggleBUtton>
                <ToggleBUtton getState={() => this.props.getState("excited")} onClickToggleButton={()=>this.props.toggle("excited")} type={"Excited"} icon={<FaLaughSquint className="icon"/>}></ToggleBUtton>
                <ToggleBUtton getState={() => this.props.getState("sad")} onClickToggleButton={()=>this.props.toggle("sad")} type={"Sad"} icon={<FaFrown className="icon"/>}></ToggleBUtton>
                <ToggleBUtton getState={() => this.props.getState("depressed")} onClickToggleButton={()=>this.props.toggle("depressed")} type={"Depressed"} icon={<FaSadCry className="icon"/>}></ToggleBUtton>
                <ToggleBUtton getState={() => this.props.getState("upset")} onClickToggleButton={()=>this.props.toggle("upset")} type={"Upset"} icon={<FaAngry className="icon"/>}></ToggleBUtton>

            </div>
        );
    }
}

export default MoodSelector;