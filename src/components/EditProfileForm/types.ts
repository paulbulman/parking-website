export interface EditProfileFormValues {
  registrationNumber: string;
  alternativeRegistrationNumber: string;
}

export interface EditProfileFormProps {
  initialValues: EditProfileFormValues;
  onChange: React.FormEventHandler<HTMLFormElement>;
  onSubmit: (parameters: EditProfileFormValues) => Promise<void>;
}
