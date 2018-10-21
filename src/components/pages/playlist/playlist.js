import React from "react";

class Playlist extends React.Component {
  state = {
    songs: []
  };
  async componentDidMount() {
    const { id } = this.props.match.params;
    const spotifyBaseUrl = "https://api.spotify.com/v1/";
    const spotifyEndpoint = `playlists/${id}/tracks`;
    const response = await fetch(`${spotifyBaseUrl}${spotifyEndpoint}`, {
      headers: {
        Authorization: `Bearer ${getCookie("access_token")}`
      }
    });
    const json = await response.json();

    console.log(json);
    this.setState({ songs: json.items });
  }

  async songClick(song) {
    console.log("songClicked");
    const spotifyBaseUrl = "https://api.spotify.com/v1/";
    const spotifyEndpoint = `me/player/play`;
    const body = {
      context_uri: song.track.album.uri,
      offset: {
        position: 5
      },
      position_ms: 0
    };
    const response = await fetch(`${spotifyBaseUrl}${spotifyEndpoint}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${getCookie("access_token")}`
      },
      body: JSON.stringify(body)
    });
  }

  renderSongs = songList => {
    return songList.map(song => {
      return (
        <div
          key={song.track.id + song.added_at}
          onClick={() => this.songClick(song)}
        >
          {song.track.name}
        </div>
      );
    });
  };

  render() {
    const { songs } = this.state;
    return <div>Songs: {this.renderSongs(songs)}</div>;
  }
}

export default Playlist;

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2)
    return parts
      .pop()
      .split(";")
      .shift();
}
