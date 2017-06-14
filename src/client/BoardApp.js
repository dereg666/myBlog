import React, { Component } from 'react';
import CommentSection from './CommentSection';
import './App.css';

class BoardApp extends Component {
  constructor() {
    super();
    this.state = {
      comments: [],
      addCommentHolder: 'Type to add a comment',
      addCommentValue: '',
      addCommentUser: '',
    };
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.textBlur = this.textBlur.bind(this);
    this.textFocus = this.textFocus.bind(this);
    this.submitFunction = this.submitFunction.bind(this);
    this.update = this.update.bind(this);
  }
  componentDidMount() {
    this.update();
  }
  update() {
    fetch('/api/loading')
      .then(response => response.json())
      .then((data) => {
        this.setState({ comments: data });
      }).catch((error) => {
        console.log('request failed', error);
      });
  }
  handleCommentChange(event, section) {
    if (section === 0) {
      this.setState({ addCommentUser: event.target.value });
    } else if (section === 1) {
      this.setState({ addCommentValue: event.target.value });
    }
  }
  clickEnter(event) {
    if (event.keyCode === 13) {
      let temp = this.state.addCommentValue;
      event.preventDefault();
      temp += '\n';
      this.setState({ addCommentValue: temp });
    }
  }
  textFocus() {
    this.setState({ addCommentHolder: '' });
  }
  textBlur() {
    this.setState({ addCommentHolder: 'Type to add a comment' });
  }
  submitFunction() {
    if (this.state.addCommentValue) {
      const addComment = {
        Name: (this.state.comments.length + 1).toString() + ' ' + (this.state.addCommentUser ? this.state.addCommentUser : 'Anonymous'),
        Value: this.state.addCommentValue,
      };
      const temp = this.state.comments;
      fetch('/api/posting', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(addComment),
      }).then(response => response.json())
        .then((res) => {
          console.log(res);
          if (res.ok === 200) {
            addComment.Time = res.Time;
            addComment.ip = res.ip;
            temp.push(addComment);
            this.setState({ comments: temp });
            this.setState({ addCommentUser: '' });
            this.setState({ addCommentValue: '' });
          } else {
            const err = new Error(res.statusText);
            err.response = res;
            throw err;
          }
        }).catch((err) => {
          console.error(err);
          this.update();
        });
      // addComment.Time = Date.now();
      // addComment.ip = '127.0.0.0';
      // temp.push(addComment);
      // this.setState({ comments: temp });
      // this.setState({ addCommentUser: '' });
      // this.setState({ addCommentValue: '' });
    }
  }
  render() {
    return (
      <div>
        <div className="header">
          <h1> Guestbook </h1>
        </div>
        <div className="App">
          <div className="Comments">
            {this.state.comments.map(c => <CommentSection
              userName={c.Name}
              commentValue={c.Value}
              postTime={c.Time}
              ip={c.ip}
            />)}
          </div>
          <div className="InputBox">
            <div className="PAC">Post A Comment</div>
            <div className="string">Name:</div>
            <input
              className="userBox"
              type="text"
              value={this.state.addCommentUser}
              onChange={e => this.handleCommentChange(e, 0)}
            />
            <div className="string">Comments ( Max: 1000 characters )</div>
            <textarea
              className="commentBox"
              type="text"
              value={this.state.addCommentValue}
              placeholder={this.state.addCommentHolder}
              onChange={e => this.handleCommentChange(e, 1)}
              onFocus={this.textFocus}
              onBlur={this.textBlur}
            /><br />
            <input
              type="submit"
              value="Post"
              onClick={this.submitFunction}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default BoardApp;
