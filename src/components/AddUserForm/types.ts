export interface AddUserFormValues {
  firstName: string;
  lastName: string;
  email: string;
  confirmEmail: string;
}

export interface AddUserFormProps {
  onSubmit: (parameters: AddUserFormValues) => Promise<void>;
}
