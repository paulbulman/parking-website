import axios from "axios";
import { useMutation } from "react-query";
import { useAuthContext } from "../../../context/auth";
import type {
  EditRequestsRequestParameters,
  EditRequestsRequestError,
  EditRequestsRequestResult,
} from "./types";

const endpoint = "requests";

const patch =
  (getToken: () => Promise<string>) =>
  async (patchData: EditRequestsRequestParameters) => {
    const baseUrl = process.env.REACT_APP_API_BASE_URL;
    const token = await getToken();
    const { data } = await axios.patch<EditRequestsRequestResult>(
      `${baseUrl}/${endpoint}`,
      patchData,
      { headers: { Authorization: "Bearer " + token } }
    );
    return data;
  };

export const useEditRequests = () => {
  const { getToken } = useAuthContext();
  const mutation = useMutation<
    EditRequestsRequestResult,
    EditRequestsRequestError,
    EditRequestsRequestParameters
  >(endpoint, patch(getToken));
  const { mutateAsync: editRequests, isLoading: isSaving } = mutation;
  return { editRequests, isSaving };
};
