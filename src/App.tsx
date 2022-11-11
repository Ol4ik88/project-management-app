import PrivateRoute from 'components/routing/PrivateRoute';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Container } from 'react-bootstrap';
import './i18n/config';
import { useTranslation } from 'react-i18next';
import { Boards } from 'views/boards';
import { store } from 'store/store';

export default function App() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <Container className="text-center">
            <h1 onClick={() => changeLanguage('ru')}>Start project.</h1>
            <p>{t('title')}</p>
          </Container>
        </header>
        <Routes>
          <Route path="/" element={<p>Welcome page</p>} />
          <Route path="/login" element={<p>Sign in</p>} />
          <Route path="/registration" element={<p>Sign up</p>} />
          <Route path="/brds" element={<Boards />} />
          <Route
            path="/boards"
            element={
              <PrivateRoute>
                <p>Boards</p>
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
      </div>
    </Provider>
  );
}
