import { useState } from "react";

function useUpdateApi() {
  const [loading, setLoading] = useState(false);

  async function updateData({ url, body }) {
    try {
      setLoading(true);
      const res = await fetch(url, {
        method: "PUT",
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

  return { loading, updateData };
}

export default useUpdateApi;
