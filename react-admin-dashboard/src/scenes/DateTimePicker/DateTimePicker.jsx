import React, { useState } from 'react';
import { DatePicker, TimePicker } from '@material-ui/pickers';
import { Slider, Typography } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';


export default function DateTimePicker() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleStartTimeChange = (time) => {
    setStartTime(time);
  };

  const handleEndTimeChange = (time) => {
    setEndTime(time);
  };

  return (
    <>
     <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Typography>Start Date</Typography>
        <DatePicker value={startDate} onChange={handleStartDateChange} />

        <Typography>End Date</Typography>
        <DatePicker value={endDate} onChange={handleEndDateChange} />

        <Typography>Start Time</Typography>
        <TimePicker value={startTime} onChange={handleStartTimeChange} />

        <Typography>End Time</Typography>
        <TimePicker value={endTime} onChange={handleEndTimeChange} />

        <Typography>Date Time Range</Typography>
        <Slider
          value={[startDate?.valueOf() + startTime?.valueOf(), endDate?.valueOf() + endTime?.valueOf()]}
          min={startDate?.valueOf() + startTime?.valueOf() ?? 0}
          max={endDate?.valueOf() + endTime?.valueOf() ?? 86400000}
          onChange={(event, value) => {
            setStartDate(new Date(value[0] - startTime?.valueOf()));
            setEndDate(new Date(value[1] - endTime?.valueOf()));
            setStartTime(new Date(value[0] - startDate?.valueOf()));
            setEndTime(new Date(value[1] - endDate?.valueOf()));
          }}
          valueLabelDisplay="auto"
        />
      </MuiPickersUtilsProvider>
    </>
  );
}