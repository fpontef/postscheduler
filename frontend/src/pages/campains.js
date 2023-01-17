import { useState, useEffect } from 'react';
import Head from 'next/head';
import { api } from '@/services/api';

// export default function Campains({ data: campains = [] }) {
export default function Campains() {
  const [campains, setCampains] = useState([]);

  const fetchCampains = async () => {
    const { data } = await api.get('/api/posts');
    setCampains(data);
    console.log('data', data);
  };

  useEffect(() => {
    fetchCampains();
  }, []);

  const handleDeleteCampain = (campainId) => {
    api.delete(`/api/posts/${campainId}`);
    setCampains((campains) => {
      return campains.filter((campain) => campain.id !== campainId);
    });
  };

  const CampainItem = (campain) => {
    return (
      <li
        key={campain.id}
        style={{ marginBottom: '1rem', border: '1px solid black' }}
      >
        {' '}
        <button onClick={() => handleDeleteCampain(campain.id)}>
          Apagar Campanha
        </button>{' '}
        id: {campain.id}
        <p>
          <strong>Título:</strong> {campain.title}
        </p>
        <p>
          <strong>Corpo da Postagem: </strong>
          {campain.body}
          <legend>
            {campain.scheduledDate
              ? `Agendado para: ${new Date(campain.scheduledDate)}`
              : 'Postado'}
          </legend>
        </p>
      </li>
    );
  };

  return (
    <>
      <Head>
        <title>APOIA.se | Financiamento Coletivo que te acompanha</title>
      </Head>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          paddingTop: '2rem',
        }}
      >
        <h1>Listagem das Campanhas</h1>
        {campains.length ? (
          <ul>{campains.map((campain) => CampainItem(campain))}</ul>
        ) : (
          'Nenhum Item encontrado'
        )}
      </div>
    </>
  );
}

// export const getServerSideProps = async () => {
//   try {
//     const response = await api.get('/api/posts');

//     return {
//       props: {
//         data: response.data,
//       },
//     };
//   } catch (err) {
//     console.error('ERROR', err);

//     return {
//       props: {
//         data: [],
//       },
//     };
//   }
// };
