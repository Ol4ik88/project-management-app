import PrivateRoute from 'components/routing/PrivateRoute';
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Container } from 'react-bootstrap';
import './i18n/config';
import { useTranslation } from 'react-i18next';
import { Boards } from 'views/Boards';
import { Board } from 'views/Board';
import { store } from 'store/store';
import Footer from 'components/layout/footer/Footer';
import Header from 'components/layout/header/Header';
import { Registration } from 'views/Registration';
import { Login } from 'views/Login';

export default function App() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Provider store={store}>
      <div className="min-vh-100 d-flex flex-column">
        <header className="App-header">
          <Header />
        </header>
        <main className="flex-grow-1 px-3">
          <Routes>
            <Route path="/" element={<p>Welcome page</p>} />
            <Route path="/welcome" element={<p>Welcome page</p>} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route
              path="/boards"
              element={
                <PrivateRoute>
                  <Boards />
                </PrivateRoute>
              }
            />
            <Route
              path="/boards/:boardId"
              element={
                <PrivateRoute>
                  <Board />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <p>profile</p>
                </PrivateRoute>
              }
            />
            <Route path="*" element={<p>404</p>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Provider>
  );
}
