import LoginForm from 'components/forms/LoginForm';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectAuth } from 'store/authSlice';

export const Login = () => {
  const { auth } = useSelector(selectAuth);

  if (auth._id) {
    return <Navigate to="/boards" />;
  }

  return <LoginForm />;
};
