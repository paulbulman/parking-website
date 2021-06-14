import { AddUserRequestParameters } from "../../hooks/api/mutations/addUser/types";

export interface ValidateFormValuesResult {
  success: boolean;
  postValues?: AddUserRequestParameters;
  errorMessage?: string;
}
