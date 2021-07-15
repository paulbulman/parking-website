import { useState, useEffect } from "react";
import { useHistory, Prompt } from "react-router-dom";
import { useAddUser } from "../../hooks/api/mutations/addUser";
import { error, success } from "../../utils/notifications";
import { validateFormValues } from "./utils";
import { Layout } from "../../components/Layout";
import { AddUserForm } from "../../components/AddUserForm";
import { AddUserFormValues } from "../../components/AddUserForm/types";

export const AddUserPage = () => {
  const [isChanged, setIsChanged] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  const history = useHistory();
  const { addUser } = useAddUser();

  const handleChange = () => {
    setIsChanged(true);
  };

  const handleSubmit = async (values: AddUserFormValues) => {
    const validationResult = validateFormValues(values);

    if (!validationResult.success || !validationResult.postValues) {
      error(validationResult.errorMessage);
      return;
    }

    try {
      await addUser(validationResult.postValues);
      setIsChanged(false);
      success("User added successfully.");
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

  return (
    <>
      <Prompt
        when={isChanged}
        message="Are you sure? You currently have unsaved changes."
      />
      <Layout heading="Add new user" subheading="Add a new user to the system:">
        <div className="columns">
          <div className="column is-half">
            <AddUserForm
              onChange={handleChange}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          </div>
        </div>
      </Layout>
    </>
  );
};
