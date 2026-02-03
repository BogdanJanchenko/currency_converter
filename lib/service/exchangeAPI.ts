import axios from 'axios';

const apiKey = process.env.NEXT_PUBLIC_API_LAYER_API_KEY;

const instance = axios.create({
  baseURL: 'https://api.apilayer.com/exchangerates_data/',
  headers: { apikey: apiKey ?? '' },
});

interface Credentials {
  amount: number;
  from: string;
  to: string;
}

export const exchangeCurrency = async (credentials: Credentials) => {
  const {
    data: { query, info, result },
  } = await instance.get('/convert', {
    params: credentials,
  });

  return { ...query, rate: info.rate, result };
};

interface LatestRatesResponse {
  rates: Record<string, number>;
}

export const latestRates = async (baseCurrency: string | null) => {
  const { data } = await instance.get<LatestRatesResponse>(`/latest?symbols&base=${baseCurrency}`);

  return Object.entries(data.rates)
    .filter(([key]) => key !== baseCurrency)
    .map(([key, value]) => ({ key, value: (1 / value).toFixed(2) }));
};
