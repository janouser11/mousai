import React from "react";
import logo from "./logo.svg";
import "./login.css";

const callBackUrl = process.env.REACT_APP_CALLBACK_URL;
const client_id = process.env.REACT_APP_CLIENT_ID;
const response_type = process.env.REACT_APP_RESPONSE_TYPE;

class Home extends React.Component {
  render() {
    console.log(callBackUrl);
    console.log(client_id);
    console.log(response_type);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to the beginning of Mousai</h1>
        </header>
        <p className="App-intro">Currently in development</p>
        <p>Coming soon...</p>
        <a
          href={`https://accounts.spotify.com/authorize/?client_id=${client_id}&response_type=${response_type}&redirect_uri=${callBackUrl}&scope=user-read-private%20user-read-email&state=34fFs29kd09`}
        >
          Spotify Sign In
        </a>
      </div>
    );
  }
}

export default Home;
