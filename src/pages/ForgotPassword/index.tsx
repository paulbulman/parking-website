import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { pwnedPassword } from "hibp";
import { useAuthContext } from "../../hooks/context/auth";
import { error, success } from "../../utils/notifications";
import { Layout } from "../../components/Layout";
import { ForgotPasswordForm } from "../../components/ForgotPasswordForm";
import { ForgotPasswordFormValues } from "../../components/ForgotPasswordForm/types";
import { ForgotPasswordSubmitFormValues } from "../../components/ForgotPasswordSubmitForm/types";
import { ForgotPasswordSubmitForm } from "../../components/ForgotPasswordSubmitForm";
import { StageName } from "./types";

export const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  const { forgotPassword, forgotPasswordSubmit } = useAuthContext();

  const [stage, setStage] = useState<StageName>("forgotPassword");
  const [email, setEmail] = useState("");

  const handleForgotPassword = async (values: ForgotPasswordFormValues) => {
    const result = await forgotPassword({ email: values.email });
    if (result) {
      setEmail(values.email);
      setStage("forgotPasswordSubmit");
    } else {
      error("Something went wrong. Please try again.");
    }
  };

  const handleForgotPasswordSubmit = async (
    values: ForgotPasswordSubmitFormValues
  ) => {
    if (values.password !== values.confirmPassword) {
      error("The password values do not match. Please correct and try again.");
      return;
    }

    const pwnedCount = await pwnedPassword(values.password);
    if (pwnedCount > 0) {
      error(
        "The password is known to have been compromised in a public data breach. Please choose a different password."
      );
      return;
    }

    const result = await forgotPasswordSubmit({
      email,
      code: values.code,
      password: values.password,
    });

    if (result) {
      success("Your password has been reset successfully.");
      navigate("/");
    } else {
      error("Something went wrong. Please try again.");
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
      <div className="columns">
        <div className="column is-half">
          {content}
          <div className="pt-5">
            <Link to="/">Cancel</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};
