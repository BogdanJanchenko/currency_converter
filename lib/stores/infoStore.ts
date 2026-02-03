import { create } from 'zustand';

export interface ExchangeInfo {
  to: string;
  from: string;
  amount: number;
  rate: number;
  result: number;
}

interface InfoStore {
  exchangeInfo: ExchangeInfo | null;
  isLoading: boolean;
  isError: boolean;

  setLoading: () => void;
  setSuccess: (data: ExchangeInfo) => void;
  setError: () => void;
}

const useInfoStore = create<InfoStore>((set) => ({
  exchangeInfo: null,
  isLoading: false,
  isError: false,

  setLoading: () => set({ isLoading: true, isError: false }),

  setSuccess: (data) =>
    set({
      exchangeInfo: data,
      isLoading: false,
      isError: false,
    }),

  setError: () =>
    set({
      isLoading: false,
      isError: true,
    }),
}));

export default useInfoStore;
