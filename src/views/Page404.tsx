import React from 'react';
import { Container, Button, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import error404 from 'assets/error404.png';

export function Page404() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <Container className="mt-5 text-center">
      <img src={error404} alt="" className="col-4 justify-content-center" />

      <Row className="justify-content-center">
        <h3>{t('page404.title')}</h3>
        <p>{t('page404.text')}</p>
        <Button className="col-4" onClick={() => navigate('/')}>
          {t('home')}
        </Button>
      </Row>
    </Container>
  );
}
