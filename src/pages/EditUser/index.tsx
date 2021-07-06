import { toast } from "react-toastify";
import { useParams, useHistory } from "react-router-dom";
import { useUser } from "../../hooks/api/queries/user";
import { useEditUser } from "../../hooks/api/mutations/editUser";
import { createInitialFormValues, validateFormValues } from "./utils";
import { EditUserForm } from "../../components/EditUserForm";
import { Loading } from "../../components/Loading";
import { Layout } from "../../components/Layout";
import { EditUserFormValues } from "../../components/EditUserForm/types";
import { UserPageParams } from "./types";

export const EditUserPage = () => {
  const history = useHistory();
  const { userId } = useParams<UserPageParams>();
  const { data, isLoading, isError } = useUser({ userId });
  const { editUser } = useEditUser({ userId });

  const handleSubmit = async (values: EditUserFormValues) => {
    const validationResult = validateFormValues(values);

    if (!validationResult.success || !validationResult.patchValues) {
      toast(validationResult.errorMessage);
      return;
    }

    try {
      await editUser(validationResult.patchValues);
      toast("User updated successfully.");
      history.push("/users");
    } catch {
      toast("Something went wrong. Please try again.");
    }
  };

  const handleCancel = () => {
    history.push("/users");
  };

  var content = isLoading ? (
    <Loading />
  ) : isError ? (
    <div>Something went wrong. Please try again.</div>
  ) : (
    data && (
      <EditUserForm
        initialValues={createInitialFormValues(data)}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    )
  );

  return (
    <Layout heading="Edit user" subheading="Update details for existing user:">
      <div className="columns">
        <div className="column is-half">{content}</div>
      </div>
    </Layout>
  );
};
