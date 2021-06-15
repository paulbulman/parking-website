export interface ForgotPasswordFormValues {
  email: string;
}

export interface ForgotPasswordFormProps {
  onSubmit: (parameters: ForgotPasswordFormValues) => Promise<void>;
}
