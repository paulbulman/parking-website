import { RegistrationNumbersRequestResult } from "../../hooks/api/queries/registrationNumbers/types";

export interface RegistrationNumbersTableProps {
  registrationNumbers: RegistrationNumbersRequestResult["registrationNumbers"];
}
