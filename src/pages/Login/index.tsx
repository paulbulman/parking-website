import { Layout } from "../../components/Layout";
import { LoginForm } from "../../components/LoginForm";
import { Link } from "react-router-dom";
import { LoginFormValues } from "../../components/LoginForm/types";

export const LoginPage = () => {
  const fakeDelay = () => new Promise((resolve) => setTimeout(resolve, 1500));

  const handleLogin = async (values: LoginFormValues) => {
    await fakeDelay();
    alert(JSON.stringify(values, null, 2));
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
