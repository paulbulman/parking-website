import { Link, useNavigate } from "react-router-dom";
import { useUsers } from "../../hooks/api/queries/users";
import { useDeleteUser } from "../../hooks/api/mutations/deleteUser";
import { Loading } from "../../components/Loading";
import { Layout } from "../../components/Layout";
import { UsersTable } from "../../components/UsersTable";
import { success } from "../../utils/notifications";
import type { User } from "./types";

export const UsersPage = () => {
  const navigate = useNavigate();
  const { data, isLoading, isRefetching, isError, refetch } = useUsers();
  const { deleteUser, isDeleting } = useDeleteUser();

  const handleEdit = (user: User) => {
    navigate(`/users/edit/${user.userId}`);
  };

  const handleDelete = async (user: User) => {
    const confirmResult = window.confirm(
      `Are you sure you want to delete user ${user.firstName} ${user.lastName}?\nThis action cannot be undone.`
    );

    if (!confirmResult) {
      return;
    }

    await deleteUser({ userId: user.userId });
    await refetch();

    success("User deleted successfully.");
  };

  const content =
    isLoading || isDeleting || isRefetching ? (
      <Loading />
    ) : isError ? (
      <div>Something went wrong. Please try again.</div>
    ) : (
      data && (
        <UsersTable
          users={data.users}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )
    );

  return (
    <Layout heading="Users" subheading="Add new or modify existing users:">
      <div>
        <Link className="button" to="/users/add">
          Add new user
        </Link>
      </div>
      <div className="pt-5">{content}</div>
    </Layout>
  );
};
