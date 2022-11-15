import React, { useState } from 'react';
import { Container, FloatingLabel } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { IUserDto } from 'types/Interfaces';

function RegistrationForm() {
  const { t } = useTranslation();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IUserDto>();

  const onSubmit: SubmitHandler<IUserDto> = (data) => {
    const { name, login, password } = data;

    console.log(data);

    // dispatch(
    //   addCards({
    //     id: uuid(),
    //     file: data.file[0].name,
    //     ...{ firstName, lastName, date, country, gender },
    //   })
    // );

    reset();
  };

  return (
    <Container className="container mt-5 col-md-6 center-block">
      <div className="container mt-5 col-md-6 d-flex justify-content-center align-items-center flex-column">
        <img
          width="50"
          className="mb-4 bootstrap-logo"
          src="https://cdn.icon-icons.com/icons2/1303/PNG/512/checkform_85890.png"
          alt="Bootstrap 5"
        />
        <h1 className="mb-3 fs-3 fw-normal text-center">{t('please sign in')}</h1>
      </div>

      <Form className="container col-md-6 center-block" onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <FloatingLabel controlId="floatingInput" label={t('name')} className="mb-3">
            <Form.Control
              required
              type="text"
              placeholder="name"
              {...register('name', {
                required: 'Please enter Name',
                minLength: { value: 2, message: t('error message - name') },
              })}
            />
          </FloatingLabel>
          <div className="text-danger">{errors.name && errors.name.message}</div>

          <FloatingLabel controlId="floatingInput" label={t('login')} className="mb-3">
            <Form.Control
              required
              type="text"
              placeholder="login"
              {...register('login', {
                required: 'Please enter Login',
                minLength: { value: 2, message: t('error message - login') },
              })}
            />
          </FloatingLabel>
          <div className="text-danger">{errors.login && errors.login.message}</div>

          <FloatingLabel controlId="floatingPassword" label={t('password')}>
            <Form.Control
              required
              type="password"
              placeholder="Password"
              {...register('password', {
                required: 'Please enter Password',
                minLength: {
                  value: 5,
                  message: t('error message - password'),
                },
              })}
            />
          </FloatingLabel>
          <div className="text-danger">{errors.password && errors.password.message}</div>
        </Form.Group>

        <Button className="btn-lg col-md-12" variant="primary" type="submit">
          {t('sign up')}
        </Button>
      </Form>
    </Container>
  );
}

export default RegistrationForm;
