import React, { Component } from 'react';
import {FaSpotify} from 'react-icons/fa';


let redirect = '';

if (process.env.NODE_ENV === "production"){
    redirect = "https://mood-mixer-backend.herokuapp.com/login";
}
else {
    redirect = "http://localhost:8888/login";
}

class HomePage extends Component {
    checkRedirect = () => {
        console.log(process.env.NODE_ENV);
        console.log(redirect);
    }
    render() {
        return (
            <div className="col main-section text-center fadeIn">
                <div className="row">
                    <h1 className="title">Mood Mixer</h1>
                </div>   
                <div className = "row">
                    <p className="paragraph">
                        Welcome to Mood Mixer! This is a website that creates Spotify playlists for you using your current moods and 
                        favorite music genres
                    </p>
                    <a className="btn" href={redirect}>   
                        <FaSpotify/> Connect to <br></br> Spotify
                    </a>
                    <button onClick={() => this.checkRedirect()}>
                        TEST
                    </button>
                </div>
            </div>
        );
    }
}

export default HomePage;