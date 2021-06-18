import { EditUserFormValues } from "../../components/EditUserForm/types";
import { UserRequestResult } from "../../hooks/api/queries/user/types";
import { ValidateFormValuesResult } from "./types";

export const createInitialFormValues = ({
  user,
}: UserRequestResult): EditUserFormValues => {
  const registrationNumber = user.registrationNumber ?? "";
  const alternativeRegistrationNumber =
    user.alternativeRegistrationNumber ?? "";
  const commuteDistance = user.commuteDistance
    ? user.commuteDistance.toString()
    : "";

  return {
    firstName: user.firstName,
    lastName: user.lastName,
    registrationNumber,
    alternativeRegistrationNumber,
    commuteDistance,
  };
};

export const validateFormValues = (
  formValues: EditUserFormValues
): ValidateFormValuesResult => {
  const parsedCommuteDistance = Number(formValues.commuteDistance);
  if (isNaN(parsedCommuteDistance) || parsedCommuteDistance < 0) {
    return {
      success: false,
      errorMessage:
        "Commute distance must be a non-negative number. Please correct and try again.",
    };
  }

  const registrationNumber =
    formValues.registrationNumber !== ""
      ? formValues.registrationNumber
      : undefined;

  const alternativeRegistrationNumber =
    formValues.alternativeRegistrationNumber !== ""
      ? formValues.alternativeRegistrationNumber
      : undefined;

  const commuteDistance =
    parsedCommuteDistance > 0 ? parsedCommuteDistance : undefined;

  return {
    success: true,
    patchValues: {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      registrationNumber,
      alternativeRegistrationNumber,
      commuteDistance,
    },
  };
};
