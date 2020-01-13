import React, { Component } from 'react';
import ToggleBUtton from './ToggleButton';
import { FaGuitar, FaHeadphones } from 'react-icons/fa';
import {GiAsianLantern , GiMicrophone, GiGuitar, GiCompactDisc }  from 'react-icons/gi';

const buttons = [
    { state: 'rock', type: 'Rock', icon: <GiGuitar className="icon"/>},
    { state: 'pop', type: 'Pop', icon: <GiMicrophone className="icon"/>},
    { state: 'hiphop', type: 'Hip Hop', icon: <GiCompactDisc className="icon"/>},
    { state: 'edm', type: 'EDM', icon: <FaHeadphones className="icon"/>},
    { state: 'oriental', type: 'Oriental', icon:<GiAsianLantern className="icon"/>},
    { state: 'latin', type: 'Latin', icon: <FaGuitar className="icon"/>}
]

class GenreSelector extends Component {
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

export default GenreSelector;