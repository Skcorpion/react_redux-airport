import React, { FC } from 'react';
import classNames from 'classnames';

type Props = {
  setSelectedDate: (date: string) => void;
  calendarDate: (date: string) => string;
  date: string;
  children: React.ReactNode;
  isActive: boolean;
};

const DateLink: FC<Props> = React.memo(
  ({ setSelectedDate, calendarDate, date, children, isActive }) => {
    return (
      <div
        className={classNames('flights-dates__day', {
          'flights-dates__day_active': isActive,
        })}
        onClick={() => setSelectedDate(date)}
      >
        <span>{calendarDate(date)}</span>
        {children}
      </div>
    );
  }
);

export default DateLink;
