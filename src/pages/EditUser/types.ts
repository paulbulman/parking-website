import { EditUserRequestBody } from "../../hooks/api/mutations/editUser/types";

export interface UserPageParams {
  userId: string;
}

export interface ValidateFormValuesResult {
  success: boolean;
  patchValues?: EditUserRequestBody;
  errorMessage?: string;
}
