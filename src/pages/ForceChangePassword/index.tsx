import { pwnedPassword } from "hibp";
import { useAuthContext } from "../../hooks/context/auth";
import { error } from "../../utils/notifications";
import { Layout } from "../../components/Layout";
import { ChangePasswordForm } from "../../components/ChangePasswordForm";
import { ChangePasswordFormValues } from "../../components/ChangePasswordForm/types";

export const ForceChangePasswordPage = () => {
  const { completeNewPassword } = useAuthContext();

  const handleSetPassword = async (values: ChangePasswordFormValues) => {
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

    const completeNewPasswordResult = await completeNewPassword({
      password: values.password,
    });

    if (!completeNewPasswordResult) {
      error("Something went wrong. Please try again.");
    }
  };

  return (
    <Layout
      heading="Set new password"
      subheading="Your password needs to be changed."
    >
      <div className="columns">
        <div className="column is-half">
          <ChangePasswordForm onSubmit={handleSetPassword} />
        </div>
      </div>
    </Layout>
  );
};
