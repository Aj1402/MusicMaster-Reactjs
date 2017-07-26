import React, { Component } from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import Profile from './Profile';


const API_KEY='ca09e1159cdc7ea9c281b1d3ad7fd21d';
const SECRET_KEY='405fc1928e65c87e6f438e2b5e42b276';
const BASE_URL = 'http://ws.audioscrobbler.com/2.0/';
class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      query: "",
      artist: null
    };
  }

  search(){
    console.log("this.state", this.state);
    let FETCH_URL = `${BASE_URL}?method=artist.getinfo&artist=${this.state.query}&autocorrect=1&api_key=${API_KEY}&format=json`;

    fetch(FETCH_URL,{
      method: 'GET'
    })
    .then(response => response.json())
    .then(json =>{
      const artist = json.artist;
      console.log("artist", artist);
      this.setState({artist});
      FETCH_URL=`${BASE_URL}?method=artist.gettoptracks&mbid=${artist.mbid}&autocorrect=1&limit=15&api_key=${API_KEY}&format=json`;
      fetch(FETCH_URL,{
        method: 'GET'
      })
      .then(response => response.json())
      .then(json =>{
        console.log("top tacks", json);
      });
    });
    console.log("fetch url", FETCH_URL);

  }

  render(){
    fetch('https://accounts.spotify.com/api/token',{
      method: 'POST',
      form: {
        grant_type: 'client_credentials'
      },
      headers: new Headers({
        'Authorization': 'Basic ' + btoa('42ac5d617fa84292b11b2d90b301f796' + ':' + '0a2ae73974854e2e932c34408bfa838d')
      })
    }).then(response => response.json())
    .then((json) => {
      console.log("json token", json);
    })
    .catch(error => console.log(error));

    return (
      <div className="App">
        <div className="App-title">
          Music Master
        </div>
        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Search for an Artist"
              value={this.state.query}
              onChange={event => {this.setState({query: event.target.value})}}
              onKeyPress={event => {
                if(event.key === 'Enter'){
                  this.search();
                }
              }}
              />
            <InputGroup.Addon onClick = {() => this.search()}>
              <Glyphicon glyph="search"></Glyphicon>
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        {
          this.state.artist!==null
          ? <div>
              <Profile
              artist = {this.state.artist}
              />
              <div className="Gallery">
                Gallery
              </div>
            </div>
            :<div></div>
        }

      </div>
    );
  }
}

export default App;
