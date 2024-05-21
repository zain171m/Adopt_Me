import { useState } from "react";
import useBreedList from "./BreedList";
import Results from "./Results";
import { useQuery } from "@tanstack/react-query";
import fetchSearch from "./fetchSearch";
const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  //const [pets, setPets] = useState([]);
  //const [location, uselocation] = useState("");
  const [animal, setAnimal] = useState("");
  //const [breed, setBreed] = useState("");
  const breeds = useBreedList(animal);

  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "",
    breed: "",
  });

  const result = useQuery(["Search", requestParams], fetchSearch);
  const pets = result?.data?.pets ?? [];

  // useEffect(() => {
  //   requestPet();
  // }, []); // eslint-disable-next-line react-hooks/exhaustive-deps

  // async function requestPet() {
  //   let res = await fetch(
  //     `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
  //   );
  //   const json = await res.json();
  //   setPets(json.pets);
  // }

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formObj = new FormData(e.target);
          const obj = {
            animal: formObj.get("animal"),
            location: formObj.get("location"),
            breed: formObj.get("breed"),
          };
          setRequestParams(obj);
        }}
      >
        <label htmlFor="location">
          Location
          <input
            type="text"
            name="location"
            id="location"
            placeholder="Location"
          />
        </label>
        <label htmlFor="animal">
          <select
            id="animal"
            name="animal"
            onChange={(e) => {
              setAnimal(e.target.value);
            }}
          >
            <option />

            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select disabled={!breeds.length} id="breed" name="breed">
            <option />
            {breeds[0].map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
