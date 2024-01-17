import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabins() {
  // useQuery hook from react query allows to run an asynchronous operation and pull data into component here - used for GET requests from database
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    // queryKey = pass in name of table created in DB to target it for updating (needs to be in an array)
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  return { isLoading, cabins, error };
}
