import React, { FC, useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import DateLink from './DateLink';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
  const calendarDate = (date: Date) => {
    return date
      .toLocaleDateString([], { month: 'numeric', day: 'numeric' })
      .replace('.', '/');
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
        selected={selectedDate}
        onChange={(date: Date) => handleDateChange(date)}
        customInput={
          <div className="flights-calendar-container">
            <div className="flights-datepicker ">
              <input
                type="text"
                readOnly
                className="datepicker-input"
                value={calendarDate(selectedDate)}
              />
            </div>
          </div>
        }
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
