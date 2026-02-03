import { create } from 'zustand';

export interface Rate {
  key: string;
  value: string;
}

interface RatesStore {
  rates: Rate[];
  isLoading: boolean;
  isError: boolean;

  setLoading: () => void;
  setRates: (rates: Rate[]) => void;
  setError: () => void;
}

const useRatesStore = create<RatesStore>((set) => ({
  rates: [],
  isLoading: false,
  isError: false,

  setRates: (rates) => set({ rates, isLoading: false, isError: false }),
  setLoading: () => set({ isLoading: true, isError: false }),
  setError: () => set({ isLoading: false, isError: true }),
}));

export default useRatesStore;
