export interface EditUserFormValues {
  firstName: string;
  lastName: string;
  registrationNumber: string;
  alternativeRegistrationNumber: string;
  commuteDistance: string;
}

export interface EditUserFormProps {
  initialValues: EditUserFormValues;
  onSubmit: (parameters: EditUserFormValues) => Promise<void>;
  onCancel: () => void;
}
