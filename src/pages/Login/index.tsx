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
      <div className="col-md-6">
        <LoginForm onSubmit={handleLogin} />
        <Link to="/">Forgotten password</Link>
      </div>
    </Layout>
  );
};
