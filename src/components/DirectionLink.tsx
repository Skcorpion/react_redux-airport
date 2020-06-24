import React, { FC } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

type Props = {
  direction: string;
  children: React.ReactNode;
};

const DirectionLink: FC<Props> = ({ direction, children }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const date = searchParams.get('date') || '';
  const query = searchParams.get('query') || '';

  return (
    <NavLink
      to={`/${direction}s${date || query ? `?${searchParams.toString()}` : ''}`}
    >
      {children}
    </NavLink>
  );
};

export default DirectionLink;
