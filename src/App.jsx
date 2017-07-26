import React, { Component } from "react";
import "./App.css";
import { FormGroup, FormControl, InputGroup, Glyphicon } from "react-bootstrap";
import Profile from "./Profile";
import Gallery from './Gallery';

// const API_KEY = "ca09e1159cdc7ea9c281b1d3ad7fd21d";
// const SECRET_KEY = "405fc1928e65c87e6f438e2b5e42b276";
// const BASE_URL = "http://ws.audioscrobbler.com/2.0/";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      artist: null,
      tracks: null
    };
  }

  search() {
    const BASE_URL = 'https://api.spotify.com/v1/search?';
    let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
    const ALBUM_URL = `https://api.spotify.com/v1/artists/`
    var accessToken = 'BQBrZmimLi7GSqQF7uJnYwUG2l4M_ZrjqSKIPmWBMOLyDtIKgYPi0kylf0yfxjI8OzbVz_SyGPUSL61FQ4q2Z1BMQ9grL2ysaPKub23TKDUl_rf-AxJ0LlJibvI9VHhiuiqgHUdCFDCwbv-4E9LIxJeGB_LbRtWyjA75fhL0';
    var myHeaders = new Headers();

    var myOptions = {
      method: 'GET',
      headers:  {
        'Authorization': 'Bearer ' + accessToken
     },
      mode: 'cors',
      cache: 'default'
    };

    fetch(FETCH_URL, myOptions)
      .then(response => response.json())
      .then(json => {
        const artist = json.artists.items[0];
        this.setState({artist});
        FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`;
        fetch(FETCH_URL,myOptions)
        .then(response => response.json())
        .then(json => {
          const { tracks } = json;
          this.setState({tracks});
        })
      });
  }

  render() {
    return (
      <div className="App">
        <div className="App-title">Music Master</div>
        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Search for an Artist"
              value={this.state.query}
              onChange={event => {
                this.setState({ query: event.target.value });
              }}
              onKeyPress={event => {
                if (event.key === "Enter") {
                  this.search();
                }
              }}
            />
            <InputGroup.Addon onClick={() => this.search()}>
              <Glyphicon glyph="search" />
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        {this.state.artist !== null && this.state.tracks!==null
          ? <div>
              <Profile artist={this.state.artist} />
              <Gallery tracks={this.state.tracks} />
            </div>
          : <div />}
      </div>
    );
  }
}

export default App;
