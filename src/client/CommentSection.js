import React, { Component } from 'react';
import PropTypes from 'prop-types';
import nologin from '../pic/No_Login_90.gif';

// const showDate = (ms) => {
//   const past = new Date(ms);
//   // const now = new Date();
//   // console.log(ms);
//   // if (now.getSeconds() - past.getSeconds() < 60) {
//   //   return 'Just now';
//   // } else if (now.getMinutes() - past.getMinutes() < 60) {
//   //   return (now.getMinutes() - past.getMinutes()).toString() + ' mins';
//   // } else if (now.getHours() - past.getHours() < 24) {
//   //   return (now.getHours() - past.getHours()).toString() + ' hrs';
//   // }
//   return 'at ' + past.toLocaleString() + ' comment | prosecute';
// };

class CommentSection extends Component {
  constructor(props) {
    super(props);
    this.show = this.show.bind(this);
    this.floor = this.floor.bind(this);
  }
  show() {
    const past = new Date(this.props.postTime);
    const str = '  於 ' + past.toLocaleString() + ' 回應 | 來源:' + this.props.ip + ' |';
    return str;
  }
  floor() {
    const str = this.props.userName.split(' ', 1) + '樓';
    return str;
  }
  render() {
    return (
      <div className="commentBlock">
        <img className="profilePic" src={nologin} alt="nologin" />
        <div className="commentDisplay">
          {this.props.commentValue.split('\n').map(item => <span>
            {item}<br />
          </span>)}
        </div>
        <div className="floorDisplay">{this.floor()}</div>
        <div className="infoDisplay">
          <span className="nameDisplay">{this.props.userName.substr(this.props.userName.indexOf(' ') + 1)}</span>
          <span>{this.show()}</span>
        </div>
      </div>
    );
  }
}

CommentSection.propTypes = {
  userName: PropTypes.string.isRequired,
  commentValue: PropTypes.string.isRequired,
  postTime: PropTypes.number.isRequired,
  ip: PropTypes.string.isRequired,
};

export default CommentSection;
