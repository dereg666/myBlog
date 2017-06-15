import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import BlogApp from './client/BlogApp';
import BoardApp from './client/BoardApp';
import PostSection from './client/PostSection';
import './client/index.css';

ReactDOM.render(
  <div>
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/" component={BlogApp} />
          <Route exact path="/post" component={PostSection} />
          <Route exact path="/article/:id" component={BoardApp} />
        </Switch>
      </div>
    </BrowserRouter>
  </div>,
  document.getElementById('root'),
);
