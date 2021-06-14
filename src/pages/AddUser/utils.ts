import { AddUserFormValues } from "../../components/AddUserForm/types";
import { ValidateFormValuesResult } from "./types";

export const validateFormValues = (
  formValues: AddUserFormValues
): ValidateFormValuesResult => {
  if (formValues.email !== formValues.confirmEmail) {
    return {
      success: false,
      errorMessage:
        "The email values do not match. Please correct and try again.",
    };
  }

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
    postValues: {
      emailAddress: formValues.email,
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      registrationNumber,
      alternativeRegistrationNumber,
      commuteDistance,
    },
  };
};
