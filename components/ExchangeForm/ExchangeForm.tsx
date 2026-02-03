'use client';

import { RiExchangeDollarFill } from 'react-icons/ri';

import styles from './ExchangeForm.module.css';
import useCurrencyStore from '@/lib/stores/currencyStore';
import { exchangeCurrency } from '@/lib/service/exchangeAPI';
import useInfoStore from '@/lib/stores/infoStore';
import toast from 'react-hot-toast';

const ExchangeForm = () => {
  const { baseCurrency } = useCurrencyStore();
  const { setSuccess, setError, setLoading } = useInfoStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const input = formData.get('currency') as string;

    const regex = /^(\d+(\.\d{1,2})?)\s([a-zA-Z]{3})\sin\s([a-zA-Z]{3})$/;
    const match = input.match(regex);

    if (!match) {
      alert(`Invalid format! Example: 15 USD in ${baseCurrency}`);
      return;
    }

    const payload = {
      amount: Number(match[1]),
      from: match[3].toUpperCase(),
      to: match[4].toUpperCase(),
    };

    try {
      setLoading();
      const data = await exchangeCurrency(payload);
      setSuccess(data);
    } catch (error) {
      toast.error('Error with exchange info');
      console.log('Error with exchange info', error);
      setError();
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <button className={styles.button} type="submit">
        <RiExchangeDollarFill className={styles.icon} />
      </button>

      <input
        type="text"
        pattern="^\d+(\.\d{1,2})?\s[a-zA-Z]{3}\sin\s[a-zA-Z]{3}$"
        placeholder={`15 USD in ${baseCurrency}`}
        title={`Request format 15 USD in ${baseCurrency}`}
        className={styles.input}
        name="currency"
        required
      />
    </form>
  );
};

export default ExchangeForm;
