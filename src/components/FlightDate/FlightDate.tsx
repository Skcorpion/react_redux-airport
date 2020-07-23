import React, { FC, useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import DateLink from './DateLink';
import DatePicker from 'react-datepicker';
import { toDateFormat, stringifyDate } from '../../helpers';
import 'react-datepicker/dist/react-datepicker.css';
import './FlightDate.scss';

const calendarDate = (date: string) =>
  toDateFormat(date).toLocaleDateString('en-GB', {
    month: 'numeric',
    day: 'numeric',
  });

function getDateToDateLink(day: number) {
  const date = new Date();
  date.setDate(date.getDate() + day);

  return stringifyDate(date);
}

const FlightDate: FC = () => {
  const location = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);
  const currentDate = stringifyDate(new Date());
  const paramsDate = searchParams.get('date') || currentDate;
  const [selectedDate, handleDateChange] = useState(paramsDate);

  useEffect(() => {
    handleDateChange(paramsDate);
    // eslint-disable-next-line
  }, [paramsDate]);

  useEffect(() => {
    if (selectedDate === currentDate) {
      searchParams.delete('date');
    } else {
      searchParams.set('date', selectedDate);
    }

    history.push({
      search: searchParams.toString(),
    });
    // eslint-disable-next-line
  }, [selectedDate]);

  return (
    <div className="flights-dates__container">
      <DatePicker
        selected={toDateFormat(selectedDate)}
        onChange={(date: Date) => handleDateChange(stringifyDate(date))}
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
          setSelectedDate={handleDateChange}
          date={getDateToDateLink(-1)}
          isActive={getDateToDateLink(-1) === selectedDate}
          calendarDate={calendarDate}
        >
          Yesterday
        </DateLink>
        <DateLink
          setSelectedDate={handleDateChange}
          date={getDateToDateLink(0)}
          isActive={getDateToDateLink(0) === selectedDate}
          calendarDate={calendarDate}
        >
          Today
        </DateLink>
        <DateLink
          setSelectedDate={handleDateChange}
          date={getDateToDateLink(1)}
          isActive={getDateToDateLink(1) === selectedDate}
          calendarDate={calendarDate}
        >
          Tomorrow
        </DateLink>
      </div>
    </div>
  );
};

export default FlightDate;
