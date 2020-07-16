import React, { FC } from 'react';
import './Header.scss';
import { NavLink } from 'react-router-dom';

const Header: FC = () => {
  return (
    <header className="header">
      <NavLink to="/">
        <h1>Home</h1>
      </NavLink>
    </header>
  );
};

export default Header;
