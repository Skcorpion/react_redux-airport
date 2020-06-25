import React, { FC, useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import DateLink from './DateLink';
import { DatePicker } from '@material-ui/pickers';

function reverseDate(date: string | null) {
  if (date) {
    return new Date(date.split('-').reverse().join('-'));
  }
  return new Date();
}

function stringifyDate(date: Date) {
  return date.toLocaleDateString().split('.').join('-');
}

const FlightDate: FC = () => {
  const location = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);
  const [selectedDate, handleDateChange] = useState(
    reverseDate(searchParams.get('date'))
  );
  const setDateParams = (date: string) => {
    handleDateChange(reverseDate(date));
  };
  const getDateToParams = (day: number) => {
    const date = new Date();
    date.setDate(date.getDate() + day);

    return stringifyDate(date);
  };

  useEffect(() => {
    const date = stringifyDate(selectedDate);
    searchParams.set('date', date);
    history.push({
      search: searchParams.toString(),
    });
    // eslint-disable-next-line
  }, [selectedDate]);

  console.log(selectedDate);

  return (
    <>
      <DatePicker
        value={selectedDate}
        onChange={(DateTime) => handleDateChange(new Date(DateTime.toISO()))}
      />
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

export default FlightDate;
