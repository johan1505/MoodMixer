import React, { Component } from 'react';
import Form from  './Form';
import {HashRouter, NavLink, Route} from 'react-router-dom';
import Spotify from 'spotify-web-api-js';
import MoodSelector from './MoodSelector';
import GenreSelector from './GenreSelector';
import {FaMusic} from 'react-icons/fa';
import {MdTagFaces, MdWarning, MdDone} from 'react-icons/md'

import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'

const spotifyWebApi = new Spotify();

class UserPage extends Component {
    constructor(){
        super();
        this.initializeComponent();
    }

    state = {
        playlistGenerated: false,
        creating: false,

        name : '',
        // Moods:
        happy : false,
        excited : false,
        sad : false,
        depressed : false,
        upset : false,

        // Genres:
        rock : false,
        pop : false,
        hipHop : false,
        edm : false,
        oriental : false,
        latin : false,

        errors : undefined
    }

    creatingOn = ()=> this.setState({ creating: true, });
    
    creatingOff = ()=> this.setState({ creating: false, });
    
    

    // Initlizes the UserPage component
    initializeComponent = () => {
        this.initializeSpotifyObject();
        this.setUserName();
    }
    
    // Get tracks given the options selected
    generatePlaylist = async (e) => {

        // Show Loading bar
        this.creatingOn();

        let t0 = 0, t1 = 0; 
        e.preventDefault();
        // Getting playlist name from the form
        const playlistName = e.target.elements.playlistName.value;
    
        // Catches any errors
        const errors = this.catchErrors(playlistName);
        if (errors.length !== 0){
            this.setState({
                errors: errors
            });
            this.creatingOff();
            return;
        }
        else {
            this.setState({
                errors: undefined
            })
        }
 
        // Clear the inputted playlist name 
        e.target.elements.playlistName.value = "";

        // Get user Id
        let userId = await this.getUserId();

        // Create a playlist for the user
        let playlistId = await this.createPlaylist(userId, playlistName);
        
        // Retrieves tracks by genres and moods selected
        t0 = performance.now();
        const tracks = await this.getTracks();
        t1 = performance.now();
        console.log("Time taken to get tracks: " + (t1 - t0) / 1000 + "s.");

        // Populates the created playlist with the retreived tracks' uris
        t0 = performance.now();
        const urisOfTracks = this.getURIs(tracks);
        t1 = performance.now();
        console.log("Time tekn to get uris from tracks: " + (t1 - t0) / 1000 + "s.");

        t0 = performance.now();
        await this.populatePlaylist(playlistId, urisOfTracks);
        t1 = performance.now();
        console.log("Time taken to populate the playlist with tracks' uris: " + (t1 - t0) / 1000 + "s.");
        this.showPlaylistGenerated();
        this.creatingOff();
    }

    showPlaylistGenerated = () => this.setState({ playlistGenerated: true });
    hidePlaylistGenerated = () => this.setState({ playlistGenerated: false });

    catchErrors = (playlistName) => {
        let errors = [];
        // If no playlist name was probided than do not call any of the APIs
        if (!playlistName) errors.push("Please enter a playlist name");
        if (this.noMoodSelected()) errors.push("Please select at least 1 mood");
        if (this.noGenreSelected()) errors.push("Please select at least 1 music genre");
        return errors;
    }

    // Returns true if no moods is selected
    noMoodSelected = () => (!this.state.happy && !this.state.sad && !this.state.excited && !this.state.depressed && !this.state.upset);

    // Returns true if no music genre is selected
    noGenreSelected = () => (!this.state.rock && !this.state.hipHop && !this.state.pop && !this.state.oriental && !this.state.latin && !this.state.edm);

    // Populates a playlist given a playlist id and a list of tracks' uris
    populatePlaylist = async (playlistId, trackUris) => {
        // If there are more then 100 tracks we have to split the request to Spotify's server
        let tempTrackUris = [];
        const chunk = 80;
        for (let i = 0; i < trackUris.length; i += chunk) {
            tempTrackUris = trackUris.slice(i , i + chunk);
            //console.log(tempTrackUris);
            await this.addTracksToPlaylist(playlistId, tempTrackUris);
        }
    }

    // Adds tracks to a playlist
    addTracksToPlaylist = async (playlistId, uriusOfTracks) => {
        const options = {
            "uris" : uriusOfTracks
        }
        await spotifyWebApi.addTracksToPlaylist(playlistId, null, options)
        .then ((response) => {
        });
    }

    // Mix moods with genres

    mixMoodsAndGenres = async (genre) => {
      let tracks = [];  
      if (this.state.excited) tracks.push(await this.getRecommendations(genre, 0.75, 1.00));
      if (this.state.happy) tracks.push(await this.getRecommendations(genre, 0.55, 0.85));
      if (this.state.upset) tracks.push(await this.getRecommendations(genre, 0.35, 0.55));
      if (this.state.sad) tracks.push(await this.getRecommendations(genre, 0.15, 0.45));
      if (this.state.depressed) tracks.push(await this.getRecommendations(genre, 0.00, 0.25));
      return tracks;
    }

    // Get recommendation tracks
    getRecommendations = async (genre, minValence, maxValence) => {
        let seed = [];
        let tracks = [];
        seed.push(genre);
        const options = {       
            seed_genres : seed,
            min_valence : minValence,
            max_valence : maxValence

        }
        tracks = await this.getRecommendationsPlaylist(options);
        return tracks;
    }

    // Returns a promise of recommendations 
    getRecommendationsPlaylist = async (options) => {
        let tracks = [];
        await spotifyWebApi.getRecommendations(options)
        .then((response) => {
            tracks = response.tracks;
        });
        return tracks;
    }

    //  Returns list of tracks base on the user's favorite genres
        
    getTracks = async () => {
        let tracks = [];
        if(this.state.rock) {
            tracks.push(await this.mixMoodsAndGenres("rock"));
            tracks.push(await this.mixMoodsAndGenres("alt-rock"));
            tracks.push(await this.mixMoodsAndGenres("hard-rock"));
            tracks.push(await this.mixMoodsAndGenres("heavy-metal"));
            tracks.push(await this.mixMoodsAndGenres("metal"));
            tracks.push(await this.mixMoodsAndGenres("rock-n-roll"));
            tracks.push(await this.mixMoodsAndGenres("rock"));
            tracks.push(await this.mixMoodsAndGenres("punk-rock"));            
        }
        if(this.state.pop){ 
            tracks.push(await this.mixMoodsAndGenres("pop"));
            tracks.push(await this.mixMoodsAndGenres("pop-film"));
            tracks.push(await this.mixMoodsAndGenres("indie-pop"));
        }
        if(this.state.hipHop) tracks.push(await this.mixMoodsAndGenres("hip-hop"));
        if(this.state.edm) {
            tracks.push(await this.mixMoodsAndGenres("edm"));
            tracks.push(await this.mixMoodsAndGenres("dubstep"));
            tracks.push(await this.mixMoodsAndGenres("electro"));
            tracks.push(await this.mixMoodsAndGenres("electronic"));
            tracks.push(await this.mixMoodsAndGenres("techno"));
            tracks.push(await this.mixMoodsAndGenres("post-dubstep"));
        }
        if(this.state.oriental) {
            tracks.push(await this.mixMoodsAndGenres("k-pop"));
            tracks.push(await this.mixMoodsAndGenres("cantopop"));
            tracks.push(await this.mixMoodsAndGenres("j-idol"));
            tracks.push(await this.mixMoodsAndGenres("j-pop"));
            tracks.push(await this.mixMoodsAndGenres("mandopop"));
        }
        if(this.state.latin) {
            tracks.push(await this.mixMoodsAndGenres("latin"));
            tracks.push(await this.mixMoodsAndGenres("latino"));
            tracks.push(await this.mixMoodsAndGenres("reggaeton")); 
            tracks.push(await this.mixMoodsAndGenres("salsa"));   
        }

        return tracks;
    }

    // Returns a promise to get the user's id
    getUserId = async () => {
        let userId = "";
        await spotifyWebApi.getMe()
        .then((response) => {
            userId = response.id;
        });
        return userId;
    }


    // Get uries out of the list of tracks
    getURIs = (listOfTracks) => {
        let listOfUris = [];
        for (let i = 0; i < listOfTracks.length; i++){
            for (let j = 0; j < listOfTracks[i].length; j++){
                for (let k = 0; k < listOfTracks[i][j].length; k++){
                    listOfUris.push(listOfTracks[i][j][k].uri);
                }
            }
        }
        // console.log("List of URIS"); console.log(listOfUris);
        return listOfUris;
    }

    // Creates a playlist in a user's account given the user id and the name of the playlist
    createPlaylist = async (userId, playlistName) => {
        let playlistId = '';
        var parameters = {
            name: playlistName  
        };
        await spotifyWebApi.createPlaylist(userId, parameters)
        .then((response) => {
            playlistId = response.id;
        });
        return playlistId;
    }

    // initialized the spotify object with the access token
    initializeSpotifyObject = () => {
        const params = this.getHashParams();
        if (params.access_token){
            spotifyWebApi.setAccessToken(params.access_token);
        }
        else {
            console.log("Error setting access token");
        }
    }

    // Sets the user name state
    setUserName = () => {
        spotifyWebApi.getMe()
        .then((response) => {
            this.setState({
                // Get the first word of the display name response
                name: response.display_name.split(" ")[0] 
            })
        });
    }

    onClickToggleButton = (type) => {
        this.setState({
            [type] : !this.state[type]
        });
    }

     returnState = (type) => {
        return this.state[type];
     }

    // Helper function to parse the access token from the url
    getHashParams = () => {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        while ( e = r.exec(q)) {
           hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        return hashParams;
    }
    
    render() {
        return (
            <HashRouter>
                <Loading 
                    show={this.state.creating}
                    color="black"
                    style={{ height: '10px' }}
                
                />
                <div className="userPage-section text-center">
                    <h1 className="title">{"Hello " + this.state.name + "!"}</h1>

                    <Route 
                        path="/Moods"
                        render = { (props) => <MoodSelector getState={this.returnState} toggle={this.onClickToggleButton}/> }
                    />
                    <Route 
                        path="/Genres"
                        render = { (props) => <GenreSelector getState={this.returnState} toggle={this.onClickToggleButton}/> }
                    />

                    <NavLink to="/Moods" className="select-buttton btn">
                        <MdTagFaces/> Select Moods
                    </NavLink>
                    <NavLink to="/Genres" className="select-buttton btn">
                       <FaMusic/> Select Genres
                    </NavLink>

                    <Form generatePlaylist = {this.generatePlaylist} hidePlaylistGenerated={this.hidePlaylistGenerated}/> 

                    { 
                        this.state.playlistGenerated && 
                        <div className="playlist-generated-box fadeIn">
                            <MdDone/> PLAYLIST GENERATED SUCCESFULLY
                        </div>
                    }
                    {
                        this.state.creating && 
                        <div className="playlist-generated-box fadeIn">
                            Creating Playlist... Please wait
                        </div>
                    }
                    {
                        this.state.errors && 
                        <div className="errors">
                            {
                                Object.keys(this.state.errors).map(i => 
                                    <div className="error fadeIn">
                                        <MdWarning/> {this.state.errors[i]}
                                    </div>
                                )
                            }
                        </div>
                    }
                </div>
            </HashRouter>
        );
    }
}
export default UserPage;    


 /*

    For testing of moods and genres:
<div className="row">
        <div className="col-6">
            <p className="title">happy: {this.state.happy + "!"}</p>
            <p className="title">excited: {this.state.excited + "!"}</p>
            <p className="title">sad: {this.state.sad + "!"}</p>
            <p className="title">depressed: {this.state.depressed + "!"}</p>
            <p className="title">upset: {this.state.upset + "!"}</p>
        </div>
        <div className="col-6">
            <p className="title">rock: {this.state.rock + "!"}</p>
            <p className="title">pop: {this.state.pop + "!"}</p>
            <p className="title">hipHop: {this.state.hipHop + "!"}</p>
            <p className="title">edm: {this.state.edm + "!"}</p>
            <p className="title">oriental: {this.state.kPop + "!"}</p>
            <p className="title">latin: {this.state.latin + "!"}</p>
        </div>
    </div>

 */