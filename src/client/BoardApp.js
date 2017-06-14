import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CommentSection from './CommentSection';
import './App.css';

// const testData = {
//   Title: 'test123',
//   Value: '<p><span style="color: #00ffff;">hahahahaha</span></p>',
//   Time: 1497447326286,
//   Comments: [
//     
//   ],
// };

class BoardApp extends Component {
  constructor() {
    super();
    this.state = {
      data: {
        Name: '',
        Title: '',
        Value: '',
        Time: 0,
        ip: '',
        Comments: [],
      },
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
    const url = '/api/loadArticle/' + this.props.match.params.id.toString();
    fetch(url)
      .then(response => response.json())
      .then((d) => {
        this.setState({ data: d });
      }).catch((error) => {
        console.error('request failed', error);
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
      const url = '/api/postComment/' + this.props.match.params.id.toString();
      const addComment = {
        Name: (this.state.data.Comments.length + 1).toString() + ' ' + (this.state.addCommentUser ? this.state.addCommentUser : 'Anonymous'),
        Value: this.state.addCommentValue,
      };
      const temp = this.state.data;
      fetch(url, {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(addComment),
      }).then(response => response.json())
        .then((res) => {
          if (res.ok === 200) {
            addComment.Time = res.Time;
            addComment.ip = res.ip;
            temp.Comments.push(addComment);
            this.setState({ data: temp });
            this.setState({ addCommentUser: '' });
            this.setState({ addCommentValue: '' });
          } else {
            const err = new Error(res.statusText);
            err.response = res;
            throw err;
          }
        }).catch((err) => {
          console.error(err);
          this.setState({ addCommentUser: '' });
          this.setState({ addCommentValue: '' });
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
          <h1>{this.data.Title}</h1>
        </div>
        <div className="App">
          <div className="Article" dangerouslySetInnerHTML={{ __html: this.state.data.Value }} />
          <div className="Comments">
            {this.state.data.Comments.map(c => <CommentSection
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
