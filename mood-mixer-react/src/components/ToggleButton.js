import React, { Component } from 'react';
import "../App.css"

class ToggleButton extends Component {

    state = {
        clicked : this.props.getState()
    }

    onClick = async () => {
        this.props.onClickToggleButton();
        this.setState({
            clicked : !this.state.clicked
        })
    }

    render() {
        return (
            <button 
                type="button"
                className={"toggle-button btn" + (this.state.clicked ? " clicked": "")}
                onClick={() => this.onClick()}
                >
                {this.props.icon}<br/>{this.props.type}
            </button>            
        );
    }
}

export default ToggleButton;