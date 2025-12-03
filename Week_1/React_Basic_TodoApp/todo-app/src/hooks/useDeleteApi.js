import { useState } from "react";

function useDeleteApi() {
  const [loading, setLoading] = useState(false);

  async function deleteData({ url }) {
    try {
      setLoading(false);
      const res = await fetch(url, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
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

  return { loading, deleteData };
}

export default useDeleteApi;
