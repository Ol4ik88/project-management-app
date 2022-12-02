import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth, updateUser } from 'store/authSlice';
import { AppDispatch } from 'store/store';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IUserDto } from 'types/Interfaces';

export function UpdateUserForm({ onClose }: { onClose: () => void }) {
  const dispatch = useDispatch<AppDispatch>();
  const authState = useSelector(selectAuth);
  const { t } = useTranslation();
  const { auth } = authState;

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IUserDto>({
    defaultValues: {
      name: auth.name ?? '',
      login: auth.login ?? '',
    },
  });

  const onSubmit: SubmitHandler<IUserDto> = (data) => {
    const userUpdate = { ...data, userId: authState.auth._id ?? '' };
    dispatch(updateUser(userUpdate));
    onClose();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3" controlId="updateUserFormName">
        <Form.Label>{t('sign-up.name')}</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder={t('sign-up.name placeholder')}
          {...register('name', {
            required: t('required field') ?? 'Please enter Name',
            minLength: { value: 2, message: t('sign-up.error message - name') },
          })}
        />
      </Form.Group>
      <div className="text-danger">{errors.name && errors.name.message}</div>

      <Form.Group className="mb-3" controlId="updateUserFormLogin">
        <Form.Label>{t('sign-up.login')}</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder={t('sign-up.login placeholder')}
          {...register('login', {
            required: t('required field') ?? 'Please enter Login',
            minLength: { value: 2, message: t('sign-up.error message - login') },
          })}
        />
      </Form.Group>
      <div className="text-danger">{errors.login && errors.login.message}</div>

      <Form.Group className="mb-3" controlId="updateUserFormPass">
        <Form.Label>{t('sign-up.password')}</Form.Label>
        <Form.Control
          required
          type="password"
          placeholder={t('sign-up.password placeholder')}
          {...register('password', {
            required: t('required field') ?? 'Please enter Password',
            minLength: {
              value: 5,
              message: t('sign-up.error message - password'),
            },
          })}
        />
      </Form.Group>
      <div className="text-danger">{errors.password && errors.password.message}</div>
      <Modal.Footer>
        <Button variant="primary" type="submit" className="shadow">
          {t('submit')}
        </Button>
        <Button variant="info" type="reset" onClick={onClose} className="shadow">
          {t('close')}
        </Button>
      </Modal.Footer>
    </Form>
  );
}
