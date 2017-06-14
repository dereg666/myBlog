import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Preview extends Component {
  constructor(props) {
    super(props);
    this.show = this.show.bind(this);
  }
  showTime() {
    const past = new Date(this.props.postTime);
    const str = past.toLocaleDateString();
    return str;
  }
  show() {
    const past = new Date(this.props.postTime);
    const str = this.props.userName + ' at 無名小站 at ' + past.toLocaleTimeString() + ' post | Reply(' + this.props.commentCount + ') |';
    return str;
  }
  render() {
    return (
      <div className="commentBlock">
        <div>{this.showTime()}</div>
        <div>{this.props.postTitle}</div>
        <Link to={`/article/${this.props.id}`}>(More......)</Link>
        <div>{this.show()}</div>
        <div>{this.props.id}</div>
      </div>
    );
  }
}

Preview.propTypes = {
  postTitle: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  commentCount: PropTypes.string.isRequired,
  postTime: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
};

export default Preview;
