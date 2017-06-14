import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import BlogApp from './client/BlogApp';
import BoardApp from './client/BoardApp';
import PostSection from './client/PostSection';
import './client/index.css';

ReactDOM.render(
  <div>
    <div>hello</div>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/post" component={PostSection} />
          <Route path="/article" component={BoardApp} />
        </Switch>
      </div>
    </BrowserRouter>
  </div>,
  document.getElementById('root'),
);
