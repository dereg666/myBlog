import React, { Component } from 'react';
import TinyEditorComponent from './TinyEditorComponent';
import './PostSection.css';

class PostSection extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      title: '',
      value: '',
    };
    // this.update = this.update.bind(this);
    this.titleChange = this.titleChange.bind(this);
    this.nameChange = this.nameChange.bind(this);
    this.valueChange = this.valueChange.bind(this);
    this.submitFunction = this.submitFunction.bind(this);
  }
  componentWillMount() {
    document.body.style.backgroundColor = 'white';
  }
  componentWillUnmount() {
    document.body.style.backgroundColor = 'rgb(195, 201, 155)';
  }

  valueChange(e) {
    this.setState({ value: e });
  }
  nameChange(e) {
    this.setState({ name: e.target.value });
  }
  titleChange(e) {
    this.setState({ title: e.target.value });
  }
  submitFunction() {
    if (this.state.title && this.state.value) {
      const addPost = {
        Title: this.state.title,
        Value: this.state.value,
        Name: this.state.name ? this.state.name : 'Anonymous',
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
        <div className="postHeader">Blog-發表新文章</div>
        <div className="newPost">發文者</div>
        <input
          className="newPostTitle"
          type="text"
          value={this.state.name}
          onChange={this.nameChange}
        />
        <div className="newPost">文章標題</div>
        <input
          className="newPostTitle"
          type="text"
          value={this.state.title}
          onChange={this.titleChange}
        />
        <div className="newPost">文章內容</div>
        <div className="tinyBox">
          <TinyEditorComponent
            id="myCoolEditor"
            ref={(instance) => { this.tiny = instance; }}
            onEditorChange={this.valueChange}
          />
        </div>
        <input
          className="newSubmit"
          type="submit"
          value="發表文章"
          onClick={this.submitFunction}
        />
      </div>
    );
  }
}

export default PostSection;
