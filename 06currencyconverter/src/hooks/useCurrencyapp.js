import { useEffect, useState } from "react";

function useCurrencyapp(currency) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://open.er-api.com/v6/latest/${currency}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        if (result.result !== "success") {
          throw new Error('Failed to fetch data');
        }
        setData(result.rates);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currency]); // Re-fetch data whenever 'currency' changes

  return { data, loading, error };
}

export default useCurrencyapp;
