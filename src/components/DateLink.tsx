import React, { FC } from 'react';
import classNames from 'classnames';

type Props = {
  setDateParams: (date: Date) => void;
  calendarDate: (date: Date) => string;
  date: Date;
  children: React.ReactNode;
  selectedDate: Date;
};

const DateLink: FC<Props> = ({
  setDateParams,
  calendarDate,
  date,
  children,
  selectedDate,
}) => {
  const isActive =
    selectedDate.toLocaleDateString() === date.toLocaleDateString();

  return (
    <div
      className={classNames('flights-dates__day', {
        'flights-dates__day_active': isActive,
      })}
      onClick={() => setDateParams(date)}
    >
      <span>{calendarDate(date)}</span>
      {children}
    </div>
  );
};

export default DateLink;
