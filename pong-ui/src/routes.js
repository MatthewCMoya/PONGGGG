import React from 'react';
import Loadable from 'react-loadable'

function Loading() {
  return <div>Loading...</div>;
}

const Widgets = Loadable({
  loader: () => import('./views/Widgets/Widgets'),
  loading: Loading,
});

const HomePage = Loadable({
  loader: () => import('./views/Custom/HomePage'),
  loading: Loading,
});

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'PongRank', component: HomePage },
  { path: '/widgets', name: 'Widgets', component: Widgets },
];

export default routes;
