import { useState } from "react";

function useCreateApi() {
  const [loading, setLoading] = useState(false);

  async function createData({ url, body }) {
    try {
      setLoading(true);
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      setLoading(false);
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return { loading, createData };
}

export default useCreateApi;
