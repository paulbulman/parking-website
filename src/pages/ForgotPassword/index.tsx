import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { pwnedPassword } from "hibp";
import { toast } from "react-toastify";
import { useAuthContext } from "../../hooks/context/auth";
import { Layout } from "../../components/Layout";
import { ForgotPasswordForm } from "../../components/ForgotPasswordForm";
import { ForgotPasswordFormValues } from "../../components/ForgotPasswordForm/types";
import { ForgotPasswordSubmitFormValues } from "../../components/ForgotPasswordSubmitForm/types";
import { ForgotPasswordSubmitForm } from "../../components/ForgotPasswordSubmitForm";
import type { StageName } from "./types";

export const ForgotPasswordPage = () => {
  const history = useHistory();

  const { forgotPassword, forgotPasswordSubmit } = useAuthContext();

  const [stage, setStage] = useState<StageName>("forgotPassword");
  const [email, setEmail] = useState("");

  const handleForgotPassword = async (values: ForgotPasswordFormValues) => {
    const result = await forgotPassword({ email: values.email });
    if (result) {
      setEmail(values.email);
      setStage("forgotPasswordSubmit");
    } else {
      toast("Something went wrong. Please try again.");
    }
  };

  const handleForgotPasswordSubmit = async (
    values: ForgotPasswordSubmitFormValues
  ) => {
    if (values.password !== values.confirmPassword) {
      toast("The password values do not match. Please correct and try again.");
      return;
    }

    const pwnedCount = await pwnedPassword(values.password);
    if (pwnedCount > 0) {
      toast(
        "The password is known to have been compromised in a public data breach. Please correct and try again."
      );
      return;
    }

    const result = await forgotPasswordSubmit({
      email,
      code: values.code,
      password: values.password,
    });

    if (result) {
      toast("Your password has been reset successfully.");
      history.push("/");
    } else {
      toast("Something went wrong. Please try again.");
    }
  };

  const subheading =
    stage === "forgotPassword"
      ? "Enter your email address below to reset your password."
      : "Check your email for a code to reset your password.";

  const content =
    stage === "forgotPassword" ? (
      <ForgotPasswordForm onSubmit={handleForgotPassword} />
    ) : (
      <ForgotPasswordSubmitForm onSubmit={handleForgotPasswordSubmit} />
    );

  return (
    <Layout heading="Forgot password" subheading={subheading}>
      <div className="col-md-6">
        {content}
        <Link to="/">Cancel</Link>
      </div>
    </Layout>
  );
};
