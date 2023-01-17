import { useContext, useState } from 'react';
import { TextInput } from '@/components/TextInput';
import { TextArea } from '@/components/TextArea';
import { CampainFormButton } from '../CampainFormButton';
import { DatePickerContext } from '@/context/DatePickerContext';

import styles from './styles.module.css';
import { api } from '@/services/api';
import dayjs from 'dayjs';

export function CampainForm() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  // const [dialogMessage, setDialogMessage] = useState('');

  const { scheduleDate, showDatePicker, setShowDatePicker } =
    useContext(DatePickerContext);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const scheduleDateAvailable =
      showDatePicker && scheduleDate ? scheduleDate : '';

    try {
      if (!scheduleDateAvailable) {
        const postCampain = await api.post(`api/posts`, {
          title,
          body,
        });

        setTitle('');
        setBody('');
        alert('Postagem de Campanha realizada!');
        return;
      }

      const postSheduledCampain = await api.post(
        `api/posts?scheduledDate=${scheduleDateAvailable}`,
        {
          title,
          body,
          scheduleDate: scheduleDateAvailable,
        }
      );

      setTitle('');
      setBody('');
      setShowDatePicker(false);
      alert(
        `Sua postagem está agendada para ${dayjs(scheduleDateAvailable).format(
          'DD/MM/YYYY'
        )} às ${dayjs(scheduleDateAvailable).format('h:mm A')}`
      );
    } catch (err) {
      console.error('ERROR', err);
      alert(err.response.data.error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Postar no Mural da Campanha</h1>

      <div className={styles.campainForm}>
        <form onSubmit={handleFormSubmit}>
          <TextInput
            title='Titulo da postagem'
            name='campainTitle'
            type='text'
            value={title}
            placeholder='Informe aqui o Título da Campanha'
            onChange={(e) => setTitle(e.target.value)}
            required={true}
          />
          <TextArea
            title='Escreva sua postagem abaixo'
            name='campainBody'
            type='text'
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required={true}
          />

          <CampainFormButton />
        </form>
      </div>
    </div>
  );
}
