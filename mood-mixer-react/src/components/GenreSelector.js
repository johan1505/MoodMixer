import React, { Component } from 'react';
import ToggleBUtton from './ToggleButton';
import { FaGuitar, FaHeadphones } from 'react-icons/fa';
import {GiAsianLantern , GiMicrophone, GiGuitar, GiCompactDisc }  from 'react-icons/gi';
class GenreSelector extends Component {
   
    render() {
        return (
            <div className="selector fadeIn">
                <ToggleBUtton getState={() => this.props.getState("rock")} onClickToggleButton={()=>this.props.toggle("rock")} type={"Rock"} icon={<GiGuitar className="icon"/>}></ToggleBUtton>
                <ToggleBUtton getState={() => this.props.getState("pop")} onClickToggleButton={()=>this.props.toggle("pop")} type={"Pop"} icon={<GiMicrophone className="icon"/>}></ToggleBUtton>
                <ToggleBUtton getState={() => this.props.getState("hipHop")} onClickToggleButton={()=>this.props.toggle("hipHop")} type={"Hip Hop"} icon={<GiCompactDisc className="icon" />}></ToggleBUtton>
                <ToggleBUtton getState={() => this.props.getState("edm")} onClickToggleButton={()=>this.props.toggle("edm")} type={"EDM"} icon={<FaHeadphones className="icon"  />}></ToggleBUtton>
                <ToggleBUtton getState={() => this.props.getState("oriental")} onClickToggleButton={()=>this.props.toggle("oriental")} type={"Oriental"} icon={<GiAsianLantern className="icon"  />}></ToggleBUtton>
                <ToggleBUtton getState={() => this.props.getState("latin")} onClickToggleButton={()=>this.props.toggle("latin")} type={"Latin"} icon={<FaGuitar className="icon"  />}></ToggleBUtton>
            </div>
        );
    }
}

export default GenreSelector;