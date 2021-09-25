export interface FindRegistrationNumberFormValues {
  registrationNumber: string;
}

export interface FindRegistrationNumberFormProps {
  initialValues: FindRegistrationNumberFormValues;
  onChange: React.FormEventHandler<HTMLFormElement>;
  onSubmit: (parameters: FindRegistrationNumberFormValues) => void;
}
