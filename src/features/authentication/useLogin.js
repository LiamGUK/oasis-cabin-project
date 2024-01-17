import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // use the useMutation hook from react-query to handle the user login as making changes to the server so will be easier to handle the success and error states.
  // useMutation hook returns the mutation and loading states by default - destructure to extract them.
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      // by default onSuccess function gets access to data received as input through function
      queryClient.setQueryData(["user"], user.user); // setQueryData allows to manually set data into the react query cache - pass in query key (set in useQuery hook function) and value
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      toast.error("Provided email or password are incorrect");
    },
  });

  return { login, isLoading };
}
