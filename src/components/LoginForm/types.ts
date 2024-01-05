export interface LoginFormValues {
  email: string;
  password: string;
}

export interface LoginFormProps {
  onSubmit: (parameters: LoginFormValues) => Promise<void>;
}
