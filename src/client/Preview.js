import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './App.css';

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
      <div className="previewBlock">
        <div className="previewTime">{this.showTime()}</div>
        <div className="previewTitle">{this.props.postTitle}</div>
        <div className="moreLink">
          <Link to={`/article/${this.props.id}`}>(More......)</Link>
        </div>
        <div className="previewShow">{this.show()}</div>
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
