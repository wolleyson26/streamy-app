import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchStreams } from "../../actions";
import styled from "styled-components";

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  renderAdmin = stream => {
    if (stream.userId === this.props.currentUserId) {
      return (
        <div className="icons">
          <Link to={`/streams/edit/${stream.id}`}>
            <i className="fas fa-pen" />
          </Link>
          <Link to={`/streams/delete/${stream.id}`}>
            <i className="fas fa-trash" />
          </Link>
        </div>
      );
    }
  };

  renderList = () => {
    return this.props.streams.map(stream => {
      return (
        <Link
          to={`streams/${stream.id}`}
          className="ui raised card"
          key={stream.id}>
          <div className="content">
            <div className="ui grid">
              <div className="two wide column">
                <i className="youtube huge red square icon" />
              </div>
              <div className="twelve wide column">
                <div className="ui header">{stream.title}</div>
                <div className="description">{stream.description}</div>
              </div>
              <div className="two wide column">{this.renderAdmin(stream)}</div>
            </div>
          </div>
        </Link>
      );
    });
  };

  renderCreate() {
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: "right" }}>
          <Link to="/streams/new" className="ui inverted green button">
            Create Stream
          </Link>
        </div>
      );
    }
  }

  render() {
    return (
      <StreamListWrapper>
        <h2>Streams</h2>
        {this.renderCreate()}
        <div className="ui stackable one cards">{this.renderList()}</div>
      </StreamListWrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  };
};

export default connect(
  mapStateToProps,
  { fetchStreams }
)(StreamList);

const StreamListWrapper = styled.section`
  .description {
    color: var(--darkGrey);
  }
  .green {
    margin-bottom: 30px;
  }
  .card {
    min-height: 100px !important;
    transition: var(--mainTransition) !important;
  }
  .fas {
    padding: 10px;
    width: 31px;
    text-align: center;
    transition: var(--mainTransition) !important;
  }
  .card:hover {
    .fas {
      display: block;
    }
  }
  .header {
    text-transform: capitalize;
  }
  .fa-pen,
  .fa-trash {
    padding: 7px;
    color: #222;
    border-color: #fff;
    border-radius: 50%;
    box-shadow: 0 1px 5px 0 #d4d4d5, 0 0 0 1px #d4d4d5;
    margin: 5px;
    display: none;
    cursor: pointer;
  }
  .fa-trash {
    background: #f55a5a;
    color: #ffff;
  }
  @media (max-width: 768px) {
    .header,
    .description {
      margin: 0 0 2px 10px !important;
    }
    .two {
      margin-right: 20px;
    }
    h2 {
      margin: 0 0 25px 15px;
    }
    .fas {
      display: block;
    }
    .icons {
      display: flex;
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;
