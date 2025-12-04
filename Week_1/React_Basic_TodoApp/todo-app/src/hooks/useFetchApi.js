import { useEffect, useState } from "react";

function useFetchApi({ url }) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);

  async function fetchData() {
    try {
      setLoading(true);
      const res = await fetch(url);
      const resData = await res.json();
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setData(resData);
      setLoading(false);
      setFetched(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, fetched, setData };
}

export default useFetchApi;
