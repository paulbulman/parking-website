export interface AddUserFormValues {
  firstName: string;
  lastName: string;
  email: string;
  confirmEmail: string;
  registrationNumber: string;
  alternativeRegistrationNumber: string;
  commuteDistance: string;
}

export interface AddUserFormProps {
  onSubmit: (parameters: AddUserFormValues) => Promise<void>;
}
