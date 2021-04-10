import { Layout } from "../../components/Layout";
import { LoginForm } from "../../components/LoginForm";
import { Link } from "react-router-dom";

export const LoginPage = () => {
  return (
    <Layout heading="Log in" subheading="Enter your details below to log in.">
      <div className="col-md-6">
        <LoginForm />
        <Link to="/">Forgotten password</Link>
      </div>
    </Layout>
  );
};
