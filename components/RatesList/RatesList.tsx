import { Rate } from '@/lib/stores/ratesStore';
import styles from './RatesList.module.css';

interface RatesListProps {
  rates: Rate[];
}

const RatesList = ({ rates }: RatesListProps) => {
  return (
    <ul className={styles.list}>
      {rates.map(({ key, value }) => (
        <li className={styles.item} key={key}>
          <p className={styles.text}>
            1 {key} = {value}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default RatesList;
