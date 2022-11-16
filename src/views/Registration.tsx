import RegistrationForm from 'components/forms/RegistrationForm';
import React from 'react';
import { Alert, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectAuth } from 'store/authSlice';

export const Registration = () => {
  const { error, status } = useSelector(selectAuth);
  const { t } = useTranslation();

  return (
    <Container className="mt-5">
      <RegistrationForm />
      {status === 'failed' && <Alert variant={'danger'}>{error}</Alert>}
      {status === 'loading' && <div>Loading...</div>}
      {status === 'succeeded' ? (
        <Alert variant={'success'}>{t('registration successfull')}</Alert>
      ) : (
        <Alert variant={'danger'}>{t('registration error')}</Alert>
      )}
    </Container>
  );
};
