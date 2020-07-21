import React, { FC } from 'react';
import classNames from 'classnames';

type Props = {
  setSelectedDate: (date: Date) => void;
  calendarDate: (date: Date) => string;
  date: Date;
  children: React.ReactNode;
  selectedDate: Date;
};

const DateLink: FC<Props> = ({
  setSelectedDate,
  calendarDate,
  date,
  children,
  selectedDate,
}) => {
  const isActive =
    selectedDate.toLocaleDateString('en-GB') ===
    date.toLocaleDateString('en-GB');

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
};

export default DateLink;
