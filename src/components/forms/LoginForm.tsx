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
import { resetState, selectAuth, signin } from 'store/authSlice';
import icon from '../../assets/login_icon.svg';
import Loading from 'components/layout/loading/Loading';

function LoginForm() {
  const [completed, setCompleted] = useState(false);
  const { status } = useSelector(selectAuth);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  type loginType = Omit<IUserDto, 'name'>;

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<loginType>();

  useEffect(() => {
    if (completed) {
      setTimeout(() => {
        if (status === 'succeeded') {
          navigate('/boards');
        } else {
          dispatch(resetState('idle'));
          reset();
        }
      }, 3000);
    }
  }, [completed, dispatch, navigate, reset, status]);

  const onSubmit: SubmitHandler<loginType> = (data) => {
    dispatch(signin(data));
    setCompleted(true);
  };

  return (
    <Container className="my-3 my-md-5 col-md-5">
      <Row className="justify-content-center">
        {completed && status === 'failed' && (
          <Alert variant={'danger'}> {t('sign-in.error')}</Alert>
        )}
        {completed && status === 'loading' && <Loading />}
        {completed && status === 'succeeded' && (
          <Alert className="text-center" variant={'success'}>
            {t('sign-in.successfull')}
          </Alert>
        )}
      </Row>
      <Row>
        <Col className="d-flex justify-content-center align-items-start">
          <img width="30px" src={icon} alt="login" className="me-3" />
          <h1 className="fs-3 fw-normal text-center">{t('sign-in.please sign in')}</h1>
        </Col>
      </Row>
      <Row>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <FloatingLabel controlId="floatingInput" label={t('sign-in.login')} className="mb-3">
              <Form.Control
                required
                type="text"
                placeholder="login"
                {...register('login', {
                  required: 'Please enter Login',
                  minLength: { value: 2, message: t('sign-in.error message - login') },
                })}
              />
            </FloatingLabel>
            <div className="text-danger">{errors.login && errors.login.message}</div>

            <FloatingLabel controlId="floatingPassword" label={t('sign-in.password')}>
              <Form.Control
                required
                type="password"
                placeholder="Password"
                {...register('password', {
                  required: 'Please enter Password',
                  minLength: {
                    value: 5,
                    message: t('sign-in.error message - password'),
                  },
                })}
              />
            </FloatingLabel>
            <div className="text-danger">{errors.password && errors.password.message}</div>
          </Form.Group>

          <Button className="btn-lg col-12" variant="primary" type="submit">
            {t('sign-in.sign in')}
          </Button>
        </Form>
      </Row>
    </Container>
  );
}

export default LoginForm;
