import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "../../../context/auth";
import { post } from "../../helpers";
import { AddUserRequestBody, AddUserRequestResult } from "./types";

export const useAddUser = () => {
  const endpoint = "users";
  const queryClient = useQueryClient();
  const { getToken } = useAuthContext();
  const mutation = useMutation<AddUserRequestResult, Error, AddUserRequestBody>(
    {
      mutationFn: post(getToken, endpoint),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["registrationNumbers"],
        });
      },
    }
  );
  return { addUser: mutation.mutateAsync };
};
