import React, { FC } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

type Props = {
  direction: string;
  children: string;
};

const DirectionLink: FC<Props> = ({ direction, children }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const date = searchParams.get('date') || '';
  const query = searchParams.get('query') || '';

  return (
    <NavLink
      className="direction-tabs__tab"
      activeClassName="direction-tabs__tab_active"
      isActive={() => {
        if (location.pathname.includes(direction)) {
          return true;
        }
        return false;
      }}
      to={`/${direction}${date || query ? `?${searchParams.toString()}` : ''}`}
    >
      {children}
    </NavLink>
  );
};

export default DirectionLink;
