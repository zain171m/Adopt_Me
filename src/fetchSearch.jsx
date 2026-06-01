const fetchSearch = async ({ queryKey }) => {
  const { location, animal, breed } = queryKey[1];
  const apiRes = await fetch(
    `http://localhost:3001/pets?animal=${animal}&location=${location}&breed_like=${breed}`
  );

  if (!apiRes.ok) {
    throw new Error(`fetch ${animal} ${location} ${breed} fetch not ok`);
  }

  return apiRes.json();
};

export default fetchSearch;
