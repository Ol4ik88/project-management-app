import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserById, selectAuth } from 'store/authSlice';
import { AppDispatch } from 'store/store';
import { Alert, Container } from 'react-bootstrap';
import { UserInfo } from 'components/userInfo/UserInfo';
import Loading from 'components/layout/loading/Loading';

export function Profile() {
  const { error, status } = useSelector(selectAuth);
  const dispatch = useDispatch<AppDispatch>();
  const { auth } = useSelector(selectAuth);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUserById({ userId: auth._id ?? '' }));
    }
  }, [dispatch, status]);

  return (
    <Container className="mt-5 d-flex justify-content-center">
      {status === 'failed' && <Alert variant={'danger'}>{error}</Alert>}
      {status === 'loading' && <Loading />}
      {status === 'succeeded' && <UserInfo />}
    </Container>
  );
}
