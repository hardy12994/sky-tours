import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import AppContainer from './containers/app.container';
import DetailContainer from './containers/detail.container';

const Router = () =>
  <Fragment>
    <Route path="/" exact component={AppContainer} />
    <Route path="/:categoryType/:categoryId" component={DetailContainer} />
  </Fragment>
export default Router;