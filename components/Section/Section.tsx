import { ReactNode, HTMLAttributes } from 'react';
import styles from './Section.module.css';

interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

export default function Section({ children, className, ...rest }: SectionProps) {
  return (
    <section className={`${styles.section} ${className ?? ''}`} {...rest}>
      {children}
    </section>
  );
}
