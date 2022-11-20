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
  const [completed, setCompleted] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IUserDto>();

  const onSubmit: SubmitHandler<IUserDto> = (data) => {
    const userUpdate = { ...data, userId: authState.auth._id ?? '' };
    dispatch(updateUser(userUpdate));
    setCompleted(true);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3" controlId="updateUserFormName">
        <Form.Label>{t('sign-up.name')}</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Enter user name"
          {...register('name', {
            required: 'Please enter Name',
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
          placeholder="Enter user login"
          {...register('login', {
            required: 'Please enter Login',
            minLength: { value: 2, message: t('sign-up.error message - login') },
          })}
        />
      </Form.Group>
      <div className="text-danger">{errors.login && errors.login.message}</div>

      <Form.Group className="mb-3" controlId="updateUserFormPass">
        <Form.Label>{t('sign-up.password')}</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Enter user password"
          {...register('password', {
            required: 'Please enter Password',
            minLength: {
              value: 5,
              message: t('sign-up.error message - password'),
            },
          })}
        />
      </Form.Group>
      <div className="text-danger">{errors.password && errors.password.message}</div>
      <Modal.Footer>
        <Button variant="secondary" type="reset" onClick={onClose}>
          {t('close')}
        </Button>
        <Button variant="info" type="submit">
          {t('submit')}
        </Button>
      </Modal.Footer>
    </Form>
  );
}
