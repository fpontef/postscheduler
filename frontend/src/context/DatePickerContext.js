import dayjs from 'dayjs';
import { useState, createContext, useEffect } from 'react';

export const DatePickerContext = createContext();

export const DatePickerProvider = ({ children }) => {
  const currentDate = dayjs().format();

  const [scheduleDate, setScheduleDate] = useState(currentDate);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    if (!showDatePicker) {
      setScheduleDate(currentDate);
    }
  }, [currentDate, showDatePicker]);

  return (
    <DatePickerContext.Provider
      value={{
        scheduleDate,
        setScheduleDate,
        showDatePicker,
        setShowDatePicker,
        currentDate,
      }}
    >
      {children}
    </DatePickerContext.Provider>
  );
};
