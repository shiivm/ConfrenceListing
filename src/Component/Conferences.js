import React, { Component } from "react";

import Conference from "./Conference";

import "../Assets/Conferences.css";

class App extends Component {
  state = {
    conferences: [],
    filteredconferences: []
  };

  componentDidMount() {
    fetch(
      "https://o136z8hk40.execute-api.us-east-1.amazonaws.com/dev/get-list-of-conferences"
    )
      .then(response => response.json())
      .then(result => {
        // console.log(result);
        let conferencesPaid = [];
        let conferencesFree = [];
        if (
          result.display_paid &&
          result.display_paid === 1 &&
          result.paid &&
          Object.keys(result.paid).length > 0
        ) {
          let paid = result.paid || {};
          conferencesPaid = Object.keys(paid).map(key => {
            return paid[key];
          });
        }
        if (
          result.display_free &&
          result.display_free === 1 &&
          result.free &&
          Object.keys(result.free).length > 0
        ) {
          let free = result.free || {};
          conferencesFree = Object.keys(free).map(key => {
            return free[key];
          });
        }

        this.setState({
          conferences: [...conferencesPaid, ...conferencesFree],
          filteredconferences : [...conferencesPaid, ...conferencesFree]
        });
      })
      .catch(error => console.log("error", error));
  }

  searchConf = (e) => {
    let val = e.target.value.toLowerCase();
    let newConferences = [ ...this.state.conferences ];

    newConferences = newConferences.filter( (conf) => {
      return (conf.confName.toLowerCase().indexOf(val) != -1 || conf.city.toLowerCase().indexOf(val) != -1)
    });
    this.setState({
      filteredconferences: [ ...newConferences ]
    });
  }
  render() {
    let conferences;
    if (
      this.state.filteredconferences &&
      Object.keys(this.state.filteredconferences).length > 0
    ) {
      conferences = Object.values(this.state.filteredconferences).map((conf,i) => {
        let data = {
          imageURL : conf.imageURL || '',
          date : conf.confStartDate + ' - ' + conf.confEndDate || '',
          confName : conf.confName || '',
          entryType : conf.entryType || '',
          confUrl : conf.confUrl || '',
          venue : conf.venue || '',
        }
        return <Conference data = { data } key={i}/>;
      });
    }
    return (
      <div>
        <div className="searchBox">
          <input type="text" placeholder="search" onKeyUp = {this.searchConf}/>
        </div>
        {/* <div className="conferences">{conferences}</div> */}
        {conferences}
      </div>
    );
  }
}

export default App;
