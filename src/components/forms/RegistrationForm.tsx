import React, { useEffect, useState } from 'react';
import { Alert, Container, FloatingLabel, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IUserDto } from 'types/Interfaces';
import { AppDispatch } from 'store/store';
import { resetState, selectAuth, signup } from 'store/authSlice';
import icon from '../../assets/registaration_icon.svg';
import Loading from 'components/layout/loading/Loading';

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

  useEffect(() => {
    if (completed) {
      setTimeout(() => {
        if (status === 'succeeded') {
          navigate('/login');
        } else {
          dispatch(resetState('idle'));
        }
      }, 3000);
    }
  }, [completed, dispatch, navigate, status]);

  const onSubmit: SubmitHandler<IUserDto> = (data) => {
    dispatch(signup(data));
    setCompleted(true);
  };

  return (
    <Container className="my-3 my-md-5 col-md-5">
      <Row>
        <Col className="d-flex justify-content-center align-items-start">
          <img width="30px" src={icon} alt="registration" className="me-3" />
          <h1 className="fs-3 fw-normal text-center">{t('sign-up.please sign up')}</h1>
        </Col>
      </Row>
      <Row>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <FloatingLabel controlId="floatingInputName" label={t('sign-up.name')} className="mb-3">
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

            <FloatingLabel
              controlId="floatingInputLogin"
              label={t('sign-up.login')}
              className="mb-3"
            >
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

          <Button className="btn-lg col-12" variant="primary" type="submit">
            {t('sign-up.sign up')}
          </Button>
        </Form>
      </Row>
      <Row className="justify-content-center mt-3">
        {completed && status === 'failed' && (
          <Alert variant={'danger'}> {t('sign-up.registration error')}</Alert>
        )}
        {completed && status === 'loading' && <Loading />}
        {completed && status === 'succeeded' && (
          <Alert className="text-center" variant={'success'}>
            {t('sign-up.registration successfull')}
          </Alert>
        )}
      </Row>
    </Container>
  );
}

export default RegistrationForm;
