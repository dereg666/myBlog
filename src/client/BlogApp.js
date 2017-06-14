import React, { Component } from 'react';
// import CommentSection from './CommentSection';
import TinyEditorComponent from './TinyEditorComponent';
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
  // }
  render() {
    return (
      <div>
        <TinyEditorComponent
          id="myCoolEditor"
          onEditorChange={content => console.log(content)}
        />
      </div>
    );
  }
}

export default BlogApp;
