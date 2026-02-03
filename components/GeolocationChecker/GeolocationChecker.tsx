'use client';

import { useEffect } from 'react';
import { getUserInfo } from '@/lib/service/opencagedataApi';
import toast from 'react-hot-toast';
import useCurrencyStore from '@/lib/stores/currencyStore';

export default function GeolocationChecker() {
  const { baseCurrency, setBaseCurrency, hasHydrated } = useCurrencyStore();

  useEffect(() => {
    if (!hasHydrated || baseCurrency) return;

    const options: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    const success = async ({ coords }: GeolocationPosition) => {
      try {
        const data = await getUserInfo(coords);
        const isoCode = data.results?.[0]?.annotations?.currency?.iso_code;

        if (isoCode) {
          setBaseCurrency(isoCode);
          console.log('Detected currency:', isoCode);
        } else {
          throw new Error('Currency not found in API response');
        }
      } catch (err) {
        console.error('Failed to get currency from location', err);
        toast.error('Unable to determine currency. USD is used by default.');
        setBaseCurrency('USD');
      }
    };

    const error = (err: GeolocationPositionError) => {
      console.error('Geolocation error', err);
      toast.error('Geolocation is unavailable. USD is used by default.');
      setBaseCurrency('USD');
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  }, [baseCurrency, hasHydrated, setBaseCurrency]);

  return null;
}
