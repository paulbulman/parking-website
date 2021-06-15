export interface ForgotPasswordSubmitFormValues {
  code: string;
  password: string;
  confirmPassword: string;
}

export interface ForgotPasswordSubmitFormProps {
  onSubmit: (parameters: ForgotPasswordSubmitFormValues) => Promise<void>;
}
