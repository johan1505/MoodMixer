import React, { Component } from 'react';
import {FaPlay} from 'react-icons/fa';

class Form extends Component {
    render() {
        return (
            <form onSubmit={this.props.generatePlaylist}>
                <div className="submit-form">
                    <div>
                        <input onChange={this.props.hidePlaylistGenerated} type="text" name="playlistName" placeholder="Enter Playlist name"/>
                        <button className="btn"><FaPlay/> Generate<br></br> playlist</button>
                    </div>
                </div>
            </form>
        );
    }
}
export default Form;