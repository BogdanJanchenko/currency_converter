'use client';

import Section from '@/components/Section/Section';
import Container from '@/components/Container/Container';
import Heading from '@/components/Heading/Heading';
import ExchangeForm from '@/components/ExchangeForm/ExchangeForm';
import Loader from '@/components/Loader/Loader';
import ExchangeInfo from '@/components/ExchangeInfo/ExchangeInfo';

import css from './page.module.css';

import { Toaster } from 'react-hot-toast';
import useInfoStore from '@/lib/stores/infoStore';

const Home = () => {
  const { isError, isLoading, exchangeInfo } = useInfoStore();

  return (
    <main className={css.main}>
      <Section>
        <Container>
          <Toaster />
          <Heading info title="What currencies do you want to exchange?🙂" />
          <ExchangeForm />
          {exchangeInfo && <ExchangeInfo {...exchangeInfo} />}
          {isError && (
            <Heading
              error
              title="Something went wrong...😐 Check the data validity and try again!"
            />
          )}
          {isLoading && <Loader />}
        </Container>
      </Section>
    </main>
  );
};

export default Home;
