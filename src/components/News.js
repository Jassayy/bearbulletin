import React, { Component } from "react";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../components/Spinner";

export class News extends Component {
  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    mode: PropTypes.string,
  };

  capitaliseFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      nextPage: null, // Store the nextPage token here
      hasMore: true,
    };
    document.title = `${this.capitaliseFirstLetter(
      this.props.category
    )} - Bear Bulletin`;
  }

  async updateNews() {
    try {
      const { country, category } = this.props;
      const { nextPage } = this.state;

      // Update the API call with nextPage instead of page number
      let url = `https://newsdata.io/api/1/news?apikey=pub_512280a27dae34f0287b68fcd2cfc0489e102&category=${category}&country=${country}&language=en`;

      if (nextPage) {
        url += `&page=${nextPage}`;
      }

      this.setState({ loading: true });
      let data = await fetch(url);
      let parsedData = await data.json();

      if (Array.isArray(parsedData.results) && parsedData.results.length > 0) {
        this.setState({
          articles: [...this.state.articles, ...parsedData.results],
          nextPage: parsedData.nextPage, // Update the nextPage token
          loading: false,
          hasMore: !!parsedData.nextPage, // If nextPage exists, there's more data
        });
      } else {
        this.setState({
          loading: false,
          hasMore: false, // No more pages if results are empty
        });
      }
    } catch (error) {
      console.error("Error fetching news data:", error);
      this.setState({ loading: false, hasMore: false });
    }
  }

  async componentDidMount() {
    this.updateNews();
  }

  fetchMoreData = async () => {
    this.updateNews(); // Call updateNews directly since it handles the pagination
  };

  render() {
    const { mode } = this.props;
    const backgroundColor = mode === "dark" ? "#333" : "#fff";
    const color = mode === "dark" ? "#fff" : "#333";
    const body = document.body;
    body.style.backgroundColor = backgroundColor;
    body.style.color = color;
    return (
      <div
        className="container"
        style={{ marginTop: "100px", backgroundColor, color }}
      >
        <h1 className="text-center" style={{ margin: "40px 0px" }}>
          BearBulletin - Top Headlines on{" "}
          {this.capitaliseFirstLetter(`${this.props.category}`)}
        </h1>

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.hasMore}
          loader={
            <h4>
              <Spinner />
            </h4>
          }
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <div className="row">
            {this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.link}>
                  <NewsItem
                    mode={this.props.mode}
                    title={
                      element.title ? element.title.slice(0, 80) : "No Title"
                    }
                    description={
                      element.description
                        ? element.description.slice(0, 90)
                        : "No Description"
                    }
                    newsUrl={element.link}
                    vidUrl={element.video_url}
                    imageUrl={
                      element.image_url
                        ? element.image_url
                        : "https://mangainsider.com/wp-content/uploads/2022/05/kanao_demon_slayer_guide.png"
                    }
                    pubDate={element.pubDate}
                    creator={
                      element.creator ? element.creator : "Unknown Source"
                    }
                    source={
                      element.source_name
                        ? element.source_name
                        : "Unknown Source"
                    }
                  />
                </div>
              );
            })}
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}

export default News;
