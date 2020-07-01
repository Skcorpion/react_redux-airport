import React, { FC } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

type Props = {
  children: string;
};

const DirectionLink: FC<Props> = ({ children }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const date = searchParams.get('date') || '';
  const query = searchParams.get('query') || '';

  return (
    <NavLink
      className="flights-tabs__tab"
      activeClassName="flights-tabs__tab_active"
      isActive={() => {
        if (location.pathname.includes(children)) {
          return true;
        }
        return false;
      }}
      to={`/${children}${date || query ? `?${searchParams.toString()}` : ''}`}
    >
      {children}
    </NavLink>
  );
};

export default DirectionLink;
