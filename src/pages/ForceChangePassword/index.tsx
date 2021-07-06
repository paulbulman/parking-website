import { pwnedPassword } from "hibp";
import { toast } from "react-toastify";
import { useAuthContext } from "../../hooks/context/auth";
import { Layout } from "../../components/Layout";
import { ChangePasswordForm } from "../../components/ChangePasswordForm";
import { ChangePasswordFormValues } from "../../components/ChangePasswordForm/types";

export const ForceChangePasswordPage = () => {
  const { completeNewPassword } = useAuthContext();

  const handleSetPassword = async (values: ChangePasswordFormValues) => {
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

    const completeNewPasswordResult = await completeNewPassword({
      password: values.password,
    });

    if (!completeNewPasswordResult) {
      toast("Something went wrong. Please try again.");
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
