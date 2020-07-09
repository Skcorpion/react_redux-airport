import React, { FC } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

type Props = {
  flightId: number;
};

const FlightDetailsLink: FC<Props> = ({ flightId }) => {
  const location = useLocation();
  const pathname = location.pathname;
  const searchParams = new URLSearchParams(location.search);
  const currentDate = new Date().toLocaleDateString().split('.').join('-');
  const date = searchParams.get('date') || currentDate;

  return (
    <NavLink to={`${pathname}${flightId}?dt=${date}`}>Flight Details</NavLink>
  );
};

export default FlightDetailsLink;
