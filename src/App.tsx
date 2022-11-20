import PrivateRoute from 'components/routing/PrivateRoute';
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Container } from 'react-bootstrap';
import './i18n/config';
import { useTranslation } from 'react-i18next';
import { Boards } from 'views/Boards';
import { store } from 'store/store';
import Footer from 'components/layout/footer/Footer';
import Header from 'components/layout/header/Header';
import Welcome from 'views/Welcome ';

export default function App() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Provider store={store}>
      <div className="min-vh-100 d-flex flex-column">
        <Header />
        <main className="flex-grow-1 px-3">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/welcome" element={<p>Welcome page</p>} />
            <Route path="/login" element={<p>Sign in</p>} />
            <Route path="/registration" element={<p>Sign up</p>} />
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
                  <p>Board ID</p>
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
