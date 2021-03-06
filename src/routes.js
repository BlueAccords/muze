import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage.js';
import NotFoundPage from './components/NotFoundPage.js';
import SearchPage from './components/search/SearchPage';
import Callback from './components/callback/index.js';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="about" component={AboutPage}/>
    <Route path="search" component={SearchPage}/>
    <Route path="callback" component={Callback}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
