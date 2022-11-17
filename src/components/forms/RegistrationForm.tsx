import React, { useState } from 'react';
import { Alert, Container, FloatingLabel } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IUserDto } from 'types/Interfaces';
import { AppDispatch } from 'store/store';
import { selectAuth, signup } from 'store/authSlice';

function RegistrationForm() {
  const [completed, setCompleted] = useState(false);
  const { status } = useSelector(selectAuth);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IUserDto>();

  const onSubmit: SubmitHandler<IUserDto> = (data) => {
    dispatch(signup(data));
    setCompleted(true);

    setTimeout(() => {
      navigate('/login');
    }, 3000);
  };

  return (
    <Container className="container position-absolute top-50 start-50 translate-middle col-md-6 center-block">
      <div className="container mt-5 col-md-6">
        {completed && status === 'failed' && (
          <Alert variant={'danger'}> {t('sign-up.registration error')}</Alert>
        )}
        {completed && status === 'loading' && (
          <Alert className="text-center" variant={'info'}>
            {t('sign-up.loading')}
          </Alert>
        )}
        {completed && status === 'succeeded' && (
          <Alert className="text-center" variant={'success'}>
            {t('sign-up.registration successfull')}
          </Alert>
        )}
      </div>

      <div className="container mt-5 col-md-6 d-flex justify-content-center align-items-center flex-column">
        <img
          width="50"
          className="mb-4 bootstrap-logo"
          src="https://cdn.icon-icons.com/icons2/2793/PNG/512/compose_edit_modify_icon_177769.png1"
          alt="Bootstrap 5"
        />
        <h1 className="mb-3 fs-3 fw-normal text-center">{t('sign-up.please sign up')}</h1>
      </div>

      <Form className="container col-md-6 center-block" onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <FloatingLabel controlId="floatingInput" label={t('sign-up.name')} className="mb-3">
            <Form.Control
              required
              type="text"
              placeholder="name"
              {...register('name', {
                required: 'Please enter Name',
                minLength: { value: 2, message: t('sign-up.error message - name') },
              })}
            />
          </FloatingLabel>
          <div className="text-danger">{errors.name && errors.name.message}</div>

          <FloatingLabel controlId="floatingInput" label={t('sign-up.login')} className="mb-3">
            <Form.Control
              required
              type="text"
              placeholder="login"
              {...register('login', {
                required: 'Please enter Login',
                minLength: { value: 2, message: t('sign-up.error message - login') },
              })}
            />
          </FloatingLabel>
          <div className="text-danger">{errors.login && errors.login.message}</div>

          <FloatingLabel controlId="floatingPassword" label={t('sign-up.password')}>
            <Form.Control
              required
              type="password"
              placeholder="Password"
              {...register('password', {
                required: 'Please enter Password',
                minLength: {
                  value: 5,
                  message: t('sign-up.error message - password'),
                },
              })}
            />
          </FloatingLabel>
          <div className="text-danger">{errors.password && errors.password.message}</div>
        </Form.Group>

        <Button className="btn-lg col-md-12" variant="primary" type="submit">
          {t('sign-up.sign up')}
        </Button>
      </Form>
    </Container>
  );
}

export default RegistrationForm;