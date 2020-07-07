import React, { FC, useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import DateLink from './DateLink';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './FlightDate.scss';

function reverseDate(date: string | null) {
  if (date) {
    return new Date(date.split('-').reverse().join('-'));
  }
  return new Date();
}
function stringifyDate(date: Date) {
  return date.toLocaleDateString().split('.').join('-');
}
function calendarDate(date: Date) {
  return date
    .toLocaleDateString([], { month: 'numeric', day: 'numeric' })
    .replace('.', '/');
}

const FlightDate: FC = () => {
  const location = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);
  const [selectedDate, handleDateChange] = useState(
    reverseDate(searchParams.get('date'))
  );
  const setDateParams = (date: Date) => {
    handleDateChange(reverseDate(stringifyDate(date)));
  };
  const getDateToParams = (day: number) => {
    const date = new Date();
    date.setDate(date.getDate() + day);

    return date;
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
    <div className="flights-dates__container">
      <DatePicker
        selected={selectedDate}
        onChange={(date: Date) => handleDateChange(date)}
        customInput={
          <div className="flights-calendar__container">
            <div className="flights-calendar__datepicker">
              <input
                type="text"
                readOnly
                className="flights-calendar__input"
                value={calendarDate(selectedDate)}
              />
            </div>
          </div>
        }
      />
      <div className="flights-dates__list">
        <DateLink
          selectedDate={selectedDate}
          calendarDate={calendarDate}
          setDateParams={setDateParams}
          date={getDateToParams(-1)}
        >
          Yesterday
        </DateLink>
        <DateLink
          selectedDate={selectedDate}
          calendarDate={calendarDate}
          setDateParams={setDateParams}
          date={getDateToParams(0)}
        >
          Today
        </DateLink>
        <DateLink
          selectedDate={selectedDate}
          calendarDate={calendarDate}
          setDateParams={setDateParams}
          date={getDateToParams(1)}
        >
          Tomorrow
        </DateLink>
      </div>
    </div>
  );
};

export default FlightDate;
