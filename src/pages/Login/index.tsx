import { toast } from "react-toastify";
import { Layout } from "../../components/Layout";
import { LoginForm } from "../../components/LoginForm";
import { Link } from "react-router-dom";
import { LoginFormValues } from "../../components/LoginForm/types";
import { useAuthContext } from "../../hooks/context/auth";

export const LoginPage = () => {
  const { signIn } = useAuthContext();

  const handleLogin = async (values: LoginFormValues) => {
    const signInResult = await signIn(values);

    if (!signInResult) {
      toast("Your login details were incorrect. Please try again.");
    }
  };

  return (
    <Layout heading="Log in" subheading="Enter your details below to log in.">
      <div className="columns">
        <div className="column is-half">
          <LoginForm onSubmit={handleLogin} />
          <div className="pt-5">
            <Link to="/forgot-password">Forgot password</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};
