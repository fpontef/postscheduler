import { useContext, useState } from 'react';
import { TextInput } from '@/components/TextInput';
import { TextArea } from '@/components/TextArea';
import { CampainFormButton } from '../CampainFormButton';
import { DatePickerContext } from '@/context/DatePickerContext';

import styles from './styles.module.css';
import { api } from '@/services/api';
import dayjs from 'dayjs';
import { DialogModal } from '@/components/DialogModal';

export function CampainForm() {
  const { scheduleDate, showDatePicker, setShowDatePicker } =
    useContext(DatePickerContext);

  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState({
    dialogTitle: '',
    dialogBody: '',
  });
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const scheduleDateAvailable =
    showDatePicker && scheduleDate ? scheduleDate : '';

  const handleOpenDialog = (dialogTitle, dialogBody) => {
    setDialogContent({ dialogTitle, dialogBody });
    setOpenDialog(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!scheduleDateAvailable) {
        setIsLoading(true);
        const postCampain = await api.post(`api/posts`, {
          title,
          body,
        });

        setTitle('');
        setBody('');
        handleOpenDialog('Tudo pronto!', 'Postagem de Campanha realizada!');
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
      handleOpenDialog(
        'Tudo pronto!',
        `Sua postagem está agendada para ${dayjs(scheduleDateAvailable).format(
          'DD/MM/YYYY'
        )} às ${dayjs(scheduleDateAvailable).format('h:mm A')}`
      );
    } catch (err) {
      console.error('ERROR', err);
      handleOpenDialog(
        'Não foi possível realizar ação',
        err.response.data.error
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <DialogModal
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        dialogContent={dialogContent}
      />
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

            <CampainFormButton isLoading={isLoading} />
          </form>
        </div>
      </div>
    </>
  );
}
