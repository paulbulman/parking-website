import { useState, useEffect } from "react";
import { useParams, useHistory, Prompt } from "react-router-dom";
import { useUser } from "../../hooks/api/queries/user";
import { useEditUser } from "../../hooks/api/mutations/editUser";
import { error, success } from "../../utils/notifications";
import { createInitialFormValues, validateFormValues } from "./utils";
import { EditUserForm } from "../../components/EditUserForm";
import { Loading } from "../../components/Loading";
import { Layout } from "../../components/Layout";
import { EditUserFormValues } from "../../components/EditUserForm/types";
import { UserPageParams } from "./types";

export const EditUserPage = () => {
  const [isChanged, setIsChanged] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  const history = useHistory();

  const { userId } = useParams<UserPageParams>();

  const { data, isLoading, isError } = useUser({ userId });
  const { editUser } = useEditUser({ userId });

  const handleChange = () => {
    setIsChanged(true);
  };

  const handleSubmit = async (values: EditUserFormValues) => {
    const validationResult = validateFormValues(values);

    if (!validationResult.success || !validationResult.patchValues) {
      error(validationResult.errorMessage);
      return;
    }

    try {
      await editUser(validationResult.patchValues);
      setIsChanged(false);
      success("User updated successfully.");
      history.push("/users");
    } catch {
      error("Something went wrong. Please try again.");
    }
  };

  const handleCancel = () => {
    setIsChanged(false);
    setIsCancelling(true);
  };

  useEffect(() => {
    if (isCancelling) {
      history.push("/users");
    }
  }, [isCancelling, history]);

  var content = isLoading ? (
    <Loading />
  ) : isError ? (
    <div>Something went wrong. Please try again.</div>
  ) : (
    data && (
      <EditUserForm
        initialValues={createInitialFormValues(data)}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    )
  );

  return (
    <>
      <Prompt
        when={isChanged}
        message="Are you sure? You currently have unsaved changes."
      />
      <Layout
        heading="Edit user"
        subheading="Update details for existing user:"
      >
        <div className="columns">
          <div className="column is-half">{content}</div>
        </div>
      </Layout>
    </>
  );
};
