import React, { Component } from 'react';
import TinyEditorComponent from './TinyEditorComponent';
import './PostSection.css';

class PostSection extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      value: '',
    };
    // this.update = this.update.bind(this);
    this.titleChange = this.titleChange.bind(this);
    this.valueChange = this.valueChange.bind(this);
    this.submitFunction = this.submitFunction.bind(this);
  }
  valueChange(e) {
    this.setState({ value: e });
  }
  titleChange(e) {
    this.setState({ title: e.target.value });
  }
  submitFunction() {
    if (this.state.title && this.state.value) {
      const addPost = {
        Title: this.state.title,
        Value: this.state.value,
        Name: 'Anonymous',
      };
      fetch('/api/posting', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(addPost),
      }).then(response => response.json())
        .then((res) => {
          console.log(res);
          if (res.ok === 200) {
            this.setState({ Title: '' });
            this.setState({ Value: '' });
          } else {
            const err = new Error(res.statusText);
            err.response = res;
            throw err;
          }
          this.tiny.reset();
          window.location.href = '/';
        }).catch((err) => {
          console.error(err);
        });
    }
  }
  render() {
    return (
      <div>
        <header className="postHeader">Blog-發表新文章</header>
        <div>文章標題</div>
        <input
          className="userBox"
          type="text"
          value={this.state.title}
          onChange={this.titleChange}
        />
        <div>文章內容</div>
        <TinyEditorComponent
          id="myCoolEditor"
          ref={(instance) => { this.tiny = instance; }}
          onEditorChange={this.valueChange}
        />
        <input
          type="submit"
          value="Post"
          onClick={this.submitFunction}
        />
      </div>
    );
  }
}

export default PostSection;
