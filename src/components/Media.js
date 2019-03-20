import React, { Component } from "react";

export class Media extends Component {
  render() {
    if (this.props.type === "image") {
      return (
        <img src={this.props.source} className="img-fluid" alt="apod-media" />
      );
    } else {
      return (
        <iframe
          width="100%"
          height="560"
          title="APOD Video"
          src={this.props.source}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      );
    }
  }
}
