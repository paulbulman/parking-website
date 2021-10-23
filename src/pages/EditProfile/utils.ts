import { EditProfileFormValues } from "../../components/EditProfileForm/types";
import { ProfileRequestResult } from "../../hooks/api/queries/profile/types";
import { EditProfileRequestBody } from "../../hooks/api/mutations/editProfile/types";

export const createInitialFormValues = ({ profile }: ProfileRequestResult) => {
  const registrationNumber = profile.registrationNumber ?? "";
  const alternativeRegistrationNumber =
    profile.alternativeRegistrationNumber ?? "";

  return {
    registrationNumber,
    alternativeRegistrationNumber,
    requestReminderEnabled: profile.requestReminderEnabled,
    reservationReminderEnabled: profile.reservationReminderEnabled,
  };
};

export const createPatchValues = (
  formValues: EditProfileFormValues
): EditProfileRequestBody => {
  const registrationNumber =
    formValues.registrationNumber !== ""
      ? formValues.registrationNumber
      : undefined;

  const alternativeRegistrationNumber =
    formValues.alternativeRegistrationNumber !== ""
      ? formValues.alternativeRegistrationNumber
      : undefined;

  return {
    registrationNumber,
    alternativeRegistrationNumber,
    requestReminderEnabled: formValues.requestReminderEnabled,
    reservationReminderEnabled: formValues.reservationReminderEnabled,
  };
};
