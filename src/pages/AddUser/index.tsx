import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { useAddUser } from "../../hooks/api/mutations/addUser";
import { Layout } from "../../components/Layout";
import { AddUserForm } from "../../components/AddUserForm";
import { AddUserFormValues } from "../../components/AddUserForm/types";
import { validateFormValues } from "./utils";

export const AddUserPage = () => {
  const history = useHistory();
  const { addUser } = useAddUser();

  const handleSubmit = async (values: AddUserFormValues) => {
    const validationResult = validateFormValues(values);

    if (!validationResult.success || !validationResult.postValues) {
      toast(validationResult.errorMessage);
      return;
    }

    try {
      await addUser(validationResult.postValues);
      toast("User added successfully.");
      history.push("/users");
    } catch {
      toast("Something went wrong. Please try again.");
    }
  };

  const handleCancel = () => {
    history.push("/users");
  };

  return (
    <Layout heading="Add new user" subheading="Add a new user to the system:">
      <div className="col-md-6">
        <AddUserForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </div>
    </Layout>
  );
};
