import React, { Component } from "react";
import { Media } from "./Media";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  TwitterShareButton,
  TwitterIcon,
} from 'react-share';

export class Apod extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      error: null,
      apod: null,
      date: new Date(),
      siteDate: this.convertSiteDate(new Date()),
    };

    this.pickDate = this.pickDate.bind(this);
    this.convertDate = this.convertDate.bind(this);
    this.convertSiteDate = this.convertSiteDate.bind(this);
  }

  async componentDidMount() {
    this.getApod(this.props.date);
  }

  async componentDidUpdate(prevProps) {
    if (this.props.date !== prevProps.date) {
      this.setState({
        isLoaded: false,
        error: null,
        apod: null
      });
      this.getApod(this.props.date);
    }
  }

  pickDate(date) {
    const newDate = this.convertDate(date);
    const newSiteDate = this.convertSiteDate(date);
    this.setState({ newDate: newDate, siteDate: newSiteDate});
    this.getApod(newDate);
  }

  convertDate(date) {
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();

    if (dd < 10) {
      dd = '0' + dd;
    }

    if (mm < 10) {
      mm = '0' + mm;
    }

    return yyyy + '-' + mm + '-' + dd;
  }

  convertSiteDate(date) {
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yy = date.getFullYear().toString().substr(-2);

    if (dd < 10) {
      dd = '0' + dd;
    }

    if (mm < 10) {
      mm = '0' + mm;
    }

    return yy + mm + dd;
  }

  async getApod(date) {
    try {
      let response = await fetch("https://api.nasa.gov/planetary/apod?date=" + date + "&api_key=keE17Q4bcothAbNHaa5cfWphKelfsdRYFXH24EuH");
      if (await response.ok) {
        response = await response.json();
        this.setState({
          isLoaded: true,
          apod: response,
        });
      } else {
        throw new Error();
      }
    } catch (e) {
      this.setState({
        isLoaded: true,
        error: e.message
      });
    }
  }

  render() {
    const { isLoaded, error, apod } = this.state;
    if (!isLoaded) {
      return (
        <div>
          <div>
            <span>Loading...</span>
          </div>
        </div>
      );
    } else if (error) {
      return (
        <p>Error</p>
      );
    } else {
      return (
        <div>
          <div style={styles.divCenter}>
          <DatePicker
            selected={this.state.date}
            onChange={this.pickDate}
          />

            <h2>{apod.title}</h2>
            <div style={styles.divCenter}>
              <Media type={apod.media_type} source={apod.url}/>
              <div style={styles.text}>
                <p>{apod.explanation}</p>
                <p><strong>Copyright:</strong> {(apod.copyright) ? apod.copyright : "Public Domain"}</p>
              </div>
            </div>
            <TwitterShareButton url={"https://apod.nasa.gov/apod/ap" + this.state.siteDate + ".html"}>
              <TwitterIcon />
            </TwitterShareButton>
          </div>
        </div>
      );
    }
  }
}

const styles = {
  divCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    color: "rgb(140, 137, 134)",
  },
  text: {
    color: "rgb(140, 137, 134)",
    margin: "auto",
    width: "50%",
    fontSize: "20px"
  }
};
