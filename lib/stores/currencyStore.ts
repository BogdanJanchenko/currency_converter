import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CurrencyStore {
  baseCurrency: string | null;
  hasHydrated: boolean;
  setBaseCurrency: (currency: string) => void;
  setHasHydrated: (state: boolean) => void;
}

const useCurrencyStore = create<CurrencyStore>()(
  persist(
    (set) => ({
      baseCurrency: null,
      hasHydrated: false,
      setBaseCurrency: (currency: string) => set({ baseCurrency: currency }),
      setHasHydrated: (state: boolean) => set({ hasHydrated: state }),
    }),
    {
      name: 'currency-storage',
      partialize: (state) => ({ baseCurrency: state.baseCurrency }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

export default useCurrencyStore;
