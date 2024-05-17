import React from 'react';
import DatePicker from 'react-datepicker';
import { DateRange } from 'react-date-range';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

interface DateTimePickerProps {
  value: {
    startDate: Date;
    endDate: Date;
  };
  onChange: (value: { startDate: Date; endDate: Date }) => void;
  disabledDates?: Date[];
}

const Calendar: React.FC<DateTimePickerProps> = ({
  value,
  onChange,
  disabledDates,
}) => {
  const handleDateChange = (dates: any) => {
    onChange({ startDate: dates[0], endDate: dates[1] });
  };

  return (
    <div>
      <DateRange
        ranges={[value]}
        onChange={handleDateChange}
        
        moveRangeOnFirstSelection={false}
        editableDateInputs={true}
      />
    </div>
  );
};

export default Calendar;
