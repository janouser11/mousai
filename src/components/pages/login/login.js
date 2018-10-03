import React from "react";
import moose from "./moose.svg";
import "./login.css";

const callBackUrl = process.env.REACT_APP_CALLBACK_URL;
const client_id = process.env.REACT_APP_CLIENT_ID;
const response_type = process.env.REACT_APP_RESPONSE_TYPE;
const login_url = `https://accounts.spotify.com/authorize/?client_id=${client_id}&response_type=${response_type}&redirect_uri=${callBackUrl}&scope=user-read-private%20user-read-email&state=34fFs29kd09`;

class Home extends React.Component {
  render() {
    console.log(callBackUrl);
    console.log(client_id);
    console.log(response_type);
    return (
      <div className="login-page">
        <div>
          <div className="logo-container">
            <div className="circle-outline">
              <img src={moose} className="logo" alt="logo" />
            </div>
          </div>

          <h1 className="title">Welcome to Mousai</h1>
          <p className="sub-title">Login to your Spotify account to continue</p>

          <div className="login-button-container">
            <a className="login-button" href={login_url}>
              Login
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
