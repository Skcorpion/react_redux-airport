import React, { FC } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import DateLink from './DateLink';

const DatePicker: FC = () => {
  const location = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);

  const setDateParams = (date: string) => {
    searchParams.set('date', date);
    history.push({
      search: searchParams.toString(),
    });
  };

  const getDateToParams = (day: number) => {
    const date = new Date();
    date.setDate(date.getDate() + day);

    return date.toLocaleDateString().split('.').join('-');
  };

  return (
    <>
      <div>
        <DateLink setDateParams={setDateParams} date={getDateToParams(-1)}>
          Yesterday
        </DateLink>
        <DateLink setDateParams={setDateParams} date={getDateToParams(0)}>
          Today
        </DateLink>
        <DateLink setDateParams={setDateParams} date={getDateToParams(1)}>
          Tomorrow
        </DateLink>
      </div>
    </>
  );
};

export default DatePicker;
