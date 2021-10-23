import { GroupName } from "../../context/auth/types";

export interface EditProfileFormValues {
  registrationNumber: string;
  alternativeRegistrationNumber: string;
  requestReminderEnabled: boolean;
  reservationReminderEnabled: boolean;
}

export interface EditProfileFormProps {
  groups: GroupName[];
  initialValues: EditProfileFormValues;
  onChange: React.FormEventHandler<HTMLFormElement>;
  onSubmit: (parameters: EditProfileFormValues) => Promise<void>;
}
