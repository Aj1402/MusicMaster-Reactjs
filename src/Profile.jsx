import React, { Component } from 'react';
import './App.css';

class Profile extends Component {
  constructor(props) {
    super(props);

  }

  render(){
    console.log("props", this.props);

    let artist={
      name: '',
      stats: {listeners: '', playcount: ''},
      image: [{},{},{},{},{}],
      tags: {tag: []}
    }
    artist = this.props.artist !== null ? this.props.artist : artist;

    return(
      <div className="profile">
        <img
          alt="Profile Image"
          className="profile-img"
          src={artist.image[4]['#text']}
          />
        <div className="profile-info">
          <div className="profile-name">{artist.name}</div>
          <div className="profile-followers">{artist.stats.listeners} followers</div>
          <div className="profile-genres">
            {
              artist.tags.tag.map((tag, k) => {
                tag.name = (tag !== artist.tags.tag[artist.tags.tag.length-1])
                                ? (` ${tag.name},`)
                                : (` & ${tag.name}`);
                return(
                  <span key={k}>{tag.name}</span>
                )
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
