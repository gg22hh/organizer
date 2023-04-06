import { Avatar } from '@mui/material';
import React from 'react';
import s from './header.module.css';

export const Header = () => {
  return (
    <header className={s.header}>
      <Avatar className={s.account} alt="" src="">
        GH
      </Avatar>
    </header>
  );
};
