export interface EditUserFormValues {
  firstName: string;
  lastName: string;
  registrationNumber: string;
  alternativeRegistrationNumber: string;
  commuteDistance: string;
}

export interface EditUserFormProps {
  initialValues: EditUserFormValues;
  onChange: React.FormEventHandler<HTMLFormElement>;
  onSubmit: (parameters: EditUserFormValues) => Promise<void>;
  onCancel: () => void;
}
