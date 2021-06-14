export interface ChangePasswordFormValues {
  password: string;
  confirmPassword: string;
}

export interface ChangePasswordFormProps {
  onSubmit: (parameters: ChangePasswordFormValues) => Promise<void>;
}
