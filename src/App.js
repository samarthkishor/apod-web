import React, { Component } from "react";
import { Apod } from "./components/Apod";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.getToday = this.getToday.bind(this);
    this.convertSiteDate = this.convertSiteDate.bind(this);
    this.state = {
      date: this.getToday(),
      siteDate: this.convertSiteDate()
    };
  }

  render() {
    return (
      <div style={styles.stars}>
        <h1 style={styles.header}>Astronomy Picture of the Day</h1>
        <Apod date={this.state.date} />
      </div>
    );
  }

  /**
   * Returns a string representation of the date in yyyy-mm-dd format
   */
  getToday() {
    const today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();

    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }

    return yyyy + "-" + mm + "-" + dd;
  }

  /**
   * Returns a string representation of the date in yymmdd format
   */
  convertSiteDate() {
    const today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    const yy = today
      .getFullYear()
      .toString()
      .substr(-2);

    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }

    return yy + mm + dd;
  }
}

// starry background from https://leaverou.github.io/css3patterns/#starry-night
const styles = {
  header: {
    color: "rgb(140, 137, 134)"
  },
  stars: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    color: "rgb(140, 137, 134)",
    position: "absolute",
    backgroundColor: "rgb(25, 27, 33)",
    backgroundImage:
      "radial-gradient(white, rgba(255, 255, 255, 0.2) 2px, transparent 40px), radial-gradient(white, rgba(255, 255, 255, 0.14902) 1px, transparent 30px), radial-gradient(white, rgba(255, 255, 255, 0.0980392) 2px, transparent 40px), radial-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.0980392) 2px, transparent 30px)",
    backgroundSize: "550px 550px, 350px 350px, 250px 250px, 150px 150px",
    backgroundPosition: "0px 0px, 40px 60px, 130px 270px, 70px 100px"
  }
};
