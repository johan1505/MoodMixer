import React, { Component } from 'react';
import ToggleBUtton from './ToggleButton';
import { FaGuitar, FaHeadphones, FaHeart } from 'react-icons/fa';
import { GiMicrophone, GiGuitar, GiCompactDisc, GiMusicalNotes, GiTrumpet }  from 'react-icons/gi';
class GenreSelector extends Component {
   
    render() {
        return (
            <div className="selector fadeIn">
                <ToggleBUtton getState={() => this.props.getState("rock")} onClickToggleButton={()=>this.props.toggle("rock")} type={"Rock"} icon={<GiGuitar className="icon"/>}></ToggleBUtton>
                <ToggleBUtton getState={() => this.props.getState("pop")} onClickToggleButton={()=>this.props.toggle("pop")} type={"Pop"} icon={<GiMicrophone className="icon"/>}></ToggleBUtton>
                <ToggleBUtton getState={() => this.props.getState("hipHop")} onClickToggleButton={()=>this.props.toggle("hipHop")} type={"Hip Hop"} icon={<GiCompactDisc className="icon" />}></ToggleBUtton>
                <ToggleBUtton getState={() => this.props.getState("edm")} onClickToggleButton={()=>this.props.toggle("edm")} type={"EDM"} icon={<FaHeadphones className="icon"  />}></ToggleBUtton>
                <ToggleBUtton getState={() => this.props.getState("salsa")} onClickToggleButton={()=>this.props.toggle("salsa")} type={"Salsa"} icon={< GiMusicalNotes className="icon"  />}></ToggleBUtton>
                <ToggleBUtton getState={() => this.props.getState("jazz")} onClickToggleButton={()=>this.props.toggle("jazz")} type={"Jazz"} icon={<GiTrumpet className="icon"  />}></ToggleBUtton>
                <ToggleBUtton getState={() => this.props.getState("kPop")} onClickToggleButton={()=>this.props.toggle("kPop")} type={"K-Pop"} icon={<FaHeart className="icon"  />}></ToggleBUtton>
                <ToggleBUtton getState={() => this.props.getState("latin")} onClickToggleButton={()=>this.props.toggle("latin")} type={"Latin"} icon={<FaGuitar className="icon"  />}></ToggleBUtton>
            </div>
        );
    }
}

export default GenreSelector;