import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    const { mode } = this.props;
    const backgroundColor = mode === "dark" ? "#001126" : "#fff";
    const color = mode === "dark" ? "#fff" : "#333";
    let { title, description, newsUrl, imageUrl, pubDate, creator, source } =
      this.props; //destructuring
    return (
      <div className="my-3">
        <div
          className="card border-info mb-3"
          style={{ backgroundColor, color }}
        >
          <span
            class="position-absolute top-0  translate-middle badge rounded-pill bg-danger"
            style={{ left: "50%", zIndex: "1" }}
          >
            {source}
          </span>
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title" style={{ backgroundColor, color }}>
              {title}...
            </h5>
            <p className="card-text" style={{ backgroundColor, color }}>
              {description}...
            </p>
            <p class="card-text" style={{ backgroundColor, color }}>
              <small style={{ backgroundColor, color }}>
                Published on {new Date(pubDate).toGMTString()} by {creator}
              </small>
            </p>
            <a
              href={newsUrl}
              rel="noreferrer"
              target="_blank"
              className="btn btn-warning btn-sm"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
