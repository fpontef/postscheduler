import { useContext } from 'react';
import { DatePicker } from '@/components/DatePicker';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { DatePickerContext } from '@/context/DatePickerContext';
import styles from './styles.module.css';

export function CampainFormButton(props) {
  const { showDatePicker, setShowDatePicker } = useContext(DatePickerContext);

  const handleArrowClick = () => {
    setShowDatePicker(!showDatePicker);
  };

  return (
    <>
      {showDatePicker && <DatePicker />}

      <div className={styles.buttonContainer}>
        <div className={styles.scheduleOption} onClick={handleArrowClick}>
          {showDatePicker ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </div>
        <button className={styles.postNow}>
          {showDatePicker ? 'Postar Agendamento' : 'Postar Agora'}
        </button>
      </div>
    </>
  );
}
