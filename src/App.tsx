import React from 'react';
import { Container } from 'react-bootstrap';
import './i18n/config';
import { useTranslation } from 'react-i18next';

export default function App() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Container className="text-center">
          <h1 onClick={() => changeLanguage('ru')}>Start project.</h1>
          <p>{t('title')}</p>
        </Container>
      </header>
    </div>
  );
}
