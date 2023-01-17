import Head from 'next/head';
import { CampainForm } from '@/components/Campain/CampainForm';
import { DatePickerProvider } from '@/context/DatePickerContext';

export default function Home() {
  return (
    <>
      <Head>
        <title>APOIA.se | Financiamento Coletivo que te acompanha</title>
      </Head>
      <DatePickerProvider>
        <CampainForm />
      </DatePickerProvider>
    </>
  );
}
