import React from "react";

class Home extends React.Component {
  state = {
    id: "",
    playlists: []
  };
  async componentDidMount() {
    const response = await fetch(`https://api.spotify.com/v1/me`, {
      headers: {
        Authorization: `Bearer ${getCookie("access_token")}`
      }
    });
    const json = await response.json();

    const playlistResponse = await fetch(
      `https://api.spotify.com/v1/me/playlists`,
      {
        headers: {
          Authorization: `Bearer ${getCookie("access_token")}`
        }
      }
    );
    const playlists = await playlistResponse.json();
    console.log(playlists);
    this.setState({ id: json.id, playlists: playlists.items });
  }

  renderPlaylists = playlists => {
    if (!playlists) return;

    var arrayLength = playlists.length;
    var items = [];
    for (var i = 0; i < arrayLength; i++) {
      let item = playlists[i];
      console.log(playlists[i]);
      items.push(<p>{item.name}</p>);
    }
    if (playlists && playlists.length > 0) {
      let test = playlists.map(x => {
        console.log("logging");
        console.log(x);
      });
    }

    return items;
  };

  render() {
    return (
      <div>
        Successfully logged in, {this.state.id}
        <h3>Playlists:</h3>
        {this.renderPlaylists(this.state.playlists)}
        {JSON.stringify(this.state.playlists)}
      </div>
    );
  }
}

export default Home;

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2)
    return parts
      .pop()
      .split(";")
      .shift();
}
