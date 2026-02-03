import Select, { SingleValue } from 'react-select';

import symbols from './symbols.json';

import './ReactSelect.css';
import styles from './SelectRates.module.css';

import useCurrencyStore from '@/lib/stores/currencyStore';

interface OptionType {
  value: string;
  label: string;
}

interface SelectRatesProps {
  baseCurrency: string | null;
}

const SelectRates = ({ baseCurrency }: SelectRatesProps) => {
  const { setBaseCurrency } = useCurrencyStore();

  const handleChange = (option: SingleValue<OptionType>) => {
    if (!option) return;

    setBaseCurrency(option.value);
  };

  return (
    <div className={styles.box}>
      <p className={styles.text}>Your base currency:&nbsp;</p>

      <Select
        options={symbols}
        value={symbols.find((opt) => opt.value === baseCurrency)}
        onChange={handleChange}
        className={styles.select}
        classNamePrefix="react-select"
        isSearchable
      />
    </div>
  );
};

export default SelectRates;
