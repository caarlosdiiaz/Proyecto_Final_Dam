import React, { useState } from 'react';
import { DateRange } from 'react-date-range';
import { addDays, format } from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

interface DateRangeSelectorProps {
  onDatesSelected: (startDate: string, endDate: string) => void;
}

const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({ onDatesSelected }) => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection',
    },
  ]);

  const handleDateChange = (ranges: any) => {
    const { startDate, endDate } = ranges.selection;
    setState([ranges.selection]);

    const formattedStartDate = startDate ? format(startDate, 'dd-MM-yyyy') : '';
    const formattedEndDate = endDate ? format(endDate, 'dd-MM-yyyy') : '';
    onDatesSelected(formattedStartDate, formattedEndDate);
  };

  return (
    <div>
      <DateRange
        editableDateInputs={true}
        onChange={(item) => handleDateChange(item)}
        moveRangeOnFirstSelection={false}
        ranges={state}
      />
    </div>
  );
};

export default DateRangeSelector;