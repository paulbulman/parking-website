import { AddUserRequestBody } from "../../hooks/api/mutations/addUser/types";

export interface ValidateFormValuesResult {
  success: boolean;
  postValues?: AddUserRequestBody;
  errorMessage?: string;
}
