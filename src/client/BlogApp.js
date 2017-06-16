import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RtButton from 'react-toolbox/lib/button/Button';
import Preview from './Preview';
import './App.css';

const WrappedLink = () => <button>
  <Link to={'/post'}>發表新文章</Link>
</button>;

class BlogApp extends Component {
  constructor() {
    super();
    this.state = {
      allDatum: [],
    };
    // this.update = this.update.bind(this);
  }
  componentDidMount() {
    const temp1 = {
      Title: '廢文1',
      userName: 'robot',
      Counts: '10',
      Time: 1497445319002,
    };
    const temp2 = {
      Title: '廢文2',
      userName: 'robot',
      Counts: '10',
      Time: 1497445319002,
    };
    const temp3 = {
      Title: '廢文3',
      userName: 'robot',
      Counts: '10',
      Time: 1497445319002,
    };
    const temp4 = {
      Title: '廢文4',
      userName: 'robot',
      Counts: '10',
      Time: 1497445319002,
    };
    const all = [temp1, temp2, temp3, temp4];
    this.setState({ allDatum: all });
    this.update();
  }
  update() {
    // fetch('/api/loadHome')
    //   .then(response => response.json())
    //   .then((data) => {
    //     this.setState({ allDatum: data });
    //   }).catch((error) => {
    //     console.log('request failed', error);
    //   });
  }
  render() {
    return (
      <div>
        <div className="header">
          <h1> Blog </h1>
        </div>
        <div className="blogApp">
          <div className="postLink" >
            <Link to={'/post'}>
              <RtButton>發表新文章</RtButton>
            </Link>
          </div>
          <div className="Articles">
            {this.state.allDatum.map(c => <Preview
              postTitle={c.Title}
              userName={c.Name}
              commentCount={c.Counts}
              postTime={c.Time}
              id={c.id}
            />)}
          </div>
        </div>
      </div>
    );
  }
}

export default BlogApp;
