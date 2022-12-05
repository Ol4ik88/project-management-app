import RegistrationForm from 'components/forms/RegistrationForm';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectAuth } from 'store/authSlice';

export const Registration = () => {
  const { auth } = useSelector(selectAuth);

  if (auth._id) {
    return <Navigate to="/boards" />;
  }

  return <RegistrationForm />;
};
