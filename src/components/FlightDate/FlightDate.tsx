import React, { FC, useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import DateLink from './DateLink';
import DatePicker from 'react-datepicker';
import { toDateFormat, stringifyDate } from '../../helpers';
import 'react-datepicker/dist/react-datepicker.css';
import './FlightDate.scss';

const calendarDate = (date: Date) =>
  date.toLocaleDateString('en-GB', { month: 'numeric', day: 'numeric' });

function getDateToDateLink(day: number) {
  const date = new Date();
  date.setDate(date.getDate() + day);

  return date;
}

const FlightDate: FC = () => {
  const location = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);
  const [selectedDate, handleDateChange] = useState(
    toDateFormat(searchParams.get('date'))
  );

  useEffect(() => {
    const date = stringifyDate(selectedDate);
    const currentDate = stringifyDate(new Date());
    if (date === currentDate) {
      searchParams.delete('date');
    } else {
      searchParams.set('date', date);
    }
    history.push({
      search: searchParams.toString(),
    });
    // eslint-disable-next-line
  }, [selectedDate]);

  console.log('selectedDate: ', selectedDate);

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
          setSelectedDate={handleDateChange}
          date={getDateToDateLink(-1)}
          calendarDate={calendarDate}
        >
          Yesterday
        </DateLink>
        <DateLink
          selectedDate={selectedDate}
          setSelectedDate={handleDateChange}
          date={getDateToDateLink(0)}
          calendarDate={calendarDate}
        >
          Today
        </DateLink>
        <DateLink
          selectedDate={selectedDate}
          setSelectedDate={handleDateChange}
          date={getDateToDateLink(1)}
          calendarDate={calendarDate}
        >
          Tomorrow
        </DateLink>
      </div>
    </div>
  );
};

export default FlightDate;
