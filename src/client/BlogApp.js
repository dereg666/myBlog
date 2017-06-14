import React, { Component } from 'react';
// import CommentSection from './CommentSection';
import './App.css';

class BlogApp extends Component {
  constructor() {
    super();
    this.state = {
    };
    // this.update = this.update.bind(this);
  }
  componentDidMount() {
    // this.update();
  }
  // update() {
  //   fetch('/api/loading')
  //     .then(response => response.json())
  //     .then((data) => {
  //       this.setState({ comments: data });
  //     }).catch((error) => {
  //       console.log('request failed', error);
  //     });
  // } <div dangerouslySetInnerHTML={{ __html: this.state.value }} />
  render() {
    return (
      <div>
      </div>
    );
  }
}

export default BlogApp;
