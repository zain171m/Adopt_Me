import { useQuery } from "@tanstack/react-query";
import fetchBreedList from "./fetchBreedList";

export default function useBreedList(animal) {
  const result = useQuery(["details", animal], fetchBreedList);
  return [result?.data?.breeds ?? [], result.status];
}
