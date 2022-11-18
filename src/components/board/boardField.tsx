import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'store/store';

export const BoardField = () => {
  //const {  } = useSelector();
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <h1>boardField</h1>
    </>
  );
};
