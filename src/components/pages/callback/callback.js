import React from "react";
import { Redirect } from "react-router-dom";
const qs = require("query-string");

const function_url = process.env.REACT_APP_FUNCTION_URL;
class Callback extends React.Component {
  state = {
    redirect: false
  };
  setCookies = json => {
    console.log(json);
    var now = new Date();
    var time = now.getTime();
    time += 3600;
    now.setTime(time);
    document.cookie = "access_token=" + json.access_token + "; path=/";
    document.cookie = `refresh_token=${json.refresh_token}; path=/`;
    this.setState({ redirect: true });
  };

  async componentDidMount() {
    console.log(function_url);
    const code = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true
    }).code;
    if (code) {
      const response = await fetch(`${function_url}/token?code=${code}`, {
        headers: {
          Accept: "application/json"
        }
      });
      const json = await response.json();
      this.setCookies(json);
    }
  }
  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/home" />;
    }
    return <div>Callback page</div>;
  }
}

export default Callback;
