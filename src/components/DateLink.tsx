import React, { FC } from 'react';

type Props = {
  setDateParams: (date: string) => void;
  date: string;
  children: React.ReactNode;
};

const DateLink: FC<Props> = ({ setDateParams, date, children }) => {
  return <div onClick={() => setDateParams(date)}>{children}</div>;
};

export default DateLink;
