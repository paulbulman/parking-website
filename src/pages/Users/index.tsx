import { Link, useHistory } from "react-router-dom";
import { useUsers } from "../../hooks/api/queries/users";
import { Loading } from "../../components/Loading";
import { Layout } from "../../components/Layout";
import { UsersTable } from "../../components/UsersTable";

export const UsersPage = () => {
  const history = useHistory();
  const { data, isLoading, isError } = useUsers();

  const handleEdit = (userId: string) => {
    history.push(`/users/edit/${userId}`);
  };

  const content = isLoading ? (
    <Loading />
  ) : isError ? (
    <div>Something went wrong. Please try again.</div>
  ) : (
    data && <UsersTable users={data.users} onEdit={handleEdit} />
  );

  return (
    <Layout heading="Users" subheading="Add new or update existing users:">
      <div>
        <Link className="button" to="/users/add">
          Add new user
        </Link>
      </div>
      <div className="pt-5">{content}</div>
    </Layout>
  );
};
