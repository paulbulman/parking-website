import { Link } from "react-router-dom";
import { useUsers } from "../../hooks/api/queries/users";
import { Loading } from "../../components/Loading";
import { Layout } from "../../components/Layout";
import { UsersTable } from "../../components/UsersTable";

export const UsersPage = () => {
  const { data, isLoading, isError } = useUsers();

  var content = isLoading ? (
    <Loading />
  ) : isError ? (
    <div>Something went wrong. Please try again.</div>
  ) : (
    data && <UsersTable users={data.users} />
  );

  return (
    <Layout heading="Users" subheading="Add new or update existing users:">
      <p>
        <Link className="btn btn-outline-primary" to="/users/add">
          Add new user
        </Link>
      </p>
      {content}
    </Layout>
  );
};
