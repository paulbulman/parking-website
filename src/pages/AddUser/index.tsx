import { useHistory } from "react-router-dom";
import { useAddUser } from "../../hooks/api/mutations/addUser";
import { error, success } from "../../utils/notifications";
import { validateFormValues } from "./utils";
import { Layout } from "../../components/Layout";
import { AddUserForm } from "../../components/AddUserForm";
import { AddUserFormValues } from "../../components/AddUserForm/types";

export const AddUserPage = () => {
  const history = useHistory();
  const { addUser } = useAddUser();

  const handleSubmit = async (values: AddUserFormValues) => {
    const validationResult = validateFormValues(values);

    if (!validationResult.success || !validationResult.postValues) {
      error(validationResult.errorMessage);
      return;
    }

    try {
      await addUser(validationResult.postValues);
      success("User added successfully.");
      history.push("/users");
    } catch {
      error("Something went wrong. Please try again.");
    }
  };

  const handleCancel = () => {
    history.push("/users");
  };

  return (
    <Layout heading="Add new user" subheading="Add a new user to the system:">
      <div className="columns">
        <div className="column is-half">
          <AddUserForm onSubmit={handleSubmit} onCancel={handleCancel} />
        </div>
      </div>
    </Layout>
  );
};
