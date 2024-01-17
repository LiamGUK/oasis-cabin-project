import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";

// Custom hook for handling deleting a cabin from the database logic

export function useDeleteCabin() {
  // useQueryClient hook used to target cached data stored in queryProvider in App.jsx shared to all child components in app
  const queryClient = useQueryClient();

  // Use useMutation hook to be able to mutate/update database where data is fetched from
  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    // mutationFN is function to run when wanting to update database - this case Delete a row item
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      toast.success("Cabin successfully deleted!");
      // onSuccess method ensures code is executed after mutationFn has been called - this will auto get the app to re-run a fetch request to update state
      // using useQueryClient hook will auto detect query provider object being shared to parent and can run invalidateQueries method to update stale detected state
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteCabin };
}
