import { useContext } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import {
  LocalizationProvider,
  MobileDateTimePicker,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextInput } from '../TextInput';
import { DatePickerContext } from '@/context/DatePickerContext';

export function DatePicker() {
  const { scheduleDate, setScheduleDate, currentDate } =
    useContext(DatePickerContext);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='pt-br'>
      <MobileDateTimePicker
        value={scheduleDate}
        onChange={(value) => {
          setScheduleDate(dayjs(value).format());
        }}
        label='Informe Data e Hora do agendamento'
        ampm={false}
        onError={console.log}
        minDate={currentDate}
        inputFormat='DD/MM/YYYY HH:mm'
        mask='__/__/____ __:__'
        renderInput={(params) => (
          <TextInput
            style={{
              border: '2 solid #CCCCCC',
              borderRadius: '5px',
            }}
            title={'Informe a Data e Hora do Agendamento'}
            {...params.inputProps}
          />
        )}
      />
    </LocalizationProvider>
  );
}
