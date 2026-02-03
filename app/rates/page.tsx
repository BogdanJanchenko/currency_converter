'use client';

import { useEffect } from 'react';
import { Wave } from 'react-animated-text';
import toast from 'react-hot-toast';

import Container from '@/components/Container/Container';
import Section from '@/components/Section/Section';
import Heading from '@/components/Heading/Heading';
import Loader from '@/components/Loader/Loader';

import css from './RatesPage.module.css';

import useRatesStore from '@/lib/stores/ratesStore';
import useCurrencyStore from '@/lib/stores/currencyStore';

import { latestRates } from '@/lib/service/exchangeAPI';
import RatesList from '@/components/RatesList/RatesList';

const RatesPage = () => {
  const { baseCurrency } = useCurrencyStore();
  const { rates, isError, isLoading, setRates, setLoading, setError } = useRatesStore();

  useEffect(() => {
    if (!baseCurrency) return;

    const fetchRates = async () => {
      try {
        setLoading();
        const data = await latestRates(baseCurrency);
        setRates(data);
      } catch (error) {
        toast.error('Error with latest rates');
        console.log('Error with latest rates', error);
        setError();
      }
    };

    fetchRates();
  }, [baseCurrency, setRates, setLoading, setError]);

  return (
    <main className={css.main}>
      <Section>
        <Container>
          <Heading
            info
            bottom
            title={
              <Wave
                text={`$ $ $ Current exchange rate for 1 ${baseCurrency} $ $ $`}
                effect="fadeOut"
                effectChange={4.0}
              />
            }
          />
          {rates && <RatesList rates={rates} />}
          {isError && (
            <Heading error title="Something went wrong...😐 We cannot show current rates!" />
          )}
          {isLoading && <Loader />}
        </Container>
      </Section>
    </main>
  );
};

export default RatesPage;
