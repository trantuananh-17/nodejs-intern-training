const fetchData = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error status: ${response.status}`);
  }

  return response.json();
};

export default fetchData;
