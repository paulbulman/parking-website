import { useState, useEffect } from "react";
import { flushSync } from "react-dom";
import { useParams, useNavigate } from "react-router";
import { Prompt } from "../../hooks/prompt";
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

  const navigate = useNavigate();

  const { userId } = useParams<keyof UserPageParams>() as UserPageParams;

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

      flushSync(() => {
        setIsChanged(false);
      });

      success("User updated successfully.");
      navigate("/users");
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
      navigate("/users");
    }
  }, [isCancelling, navigate]);

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
