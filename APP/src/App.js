import React, { Component, Suspense } from 'react';
import { HashRouter, Route, Routes, Outlet } from 'react-router-dom';
import './scss/style.scss';
import DefaultLayout from './layout/DefaultLayout';
import BugView from './views/bug/BugView'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route path="/" element={<DefaultLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/404" element={<Page404 />} />
              <Route path="/500" element={<Page500 />} />
              <Route path="/bug/:bugId" element={<BugView />} />
              <Route path="*" element={<Outlet />} />
            </Route>
          </Routes>
        </Suspense>
      </HashRouter>
    );
  }
}

export default App;
