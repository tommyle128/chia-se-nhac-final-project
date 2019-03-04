import React, { Component } from 'react';
import axios from "../axios";

import NavBar from "../components/NavBar";
import MainContent from "../components/MainContent";


export default class DetailScreen extends Component {
  state = {
    tracks: [],
    searchString: ""
  };
  
  componentDidMount() {
    axios
      .get("/api/tracks")
      .then(data => {
        console.log(data.data);
        this.setState({
          tracks: data.data
        });
      })
      .catch(err => console.error(err));
  }

  _onSearchChanged = text => this.setState({ searchString: text });    

  render() {
    const displayedTracks = this.state.tracks.filter(
      track =>
        track.name.includes(this.state.searchString) ||
        track.artist.name.includes(this.state.searchString)
    );

    return (
      <div>
        <NavBar
          onSearchChanged={this._onSearchChanged}
        />
        <MainContent tracks={displayedTracks} />
      </div>
    )
  }
}
