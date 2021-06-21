export interface EditProfileFormValues {
  registrationNumber: string;
  alternativeRegistrationNumber: string;
}

export interface EditProfileFormProps {
  initialValues: EditProfileFormValues;
  onSubmit: (parameters: EditProfileFormValues) => Promise<void>;
  onCancel: () => void;
}
