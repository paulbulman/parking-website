import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { useAddUser } from "../../hooks/api/mutations/addUser";
import { Layout } from "../../components/Layout";
import { AddUserForm } from "../../components/AddUserForm";
import { AddUserFormValues } from "../../components/AddUserForm/types";

export const AddUserPage = () => {
  const history = useHistory();
  const { addUser } = useAddUser();

  const handleSubmit = async (values: AddUserFormValues) => {
    if (values.email !== values.confirmEmail) {
      toast("The email values do not match. Please correct and try again.");
      return;
    }

    const user = {
      firstName: values.firstName,
      lastName: values.lastName,
      emailAddress: values.email,
    };

    try {
      await addUser(user);
      toast("User added successfully.");
      history.push("/users");
    } catch {
      toast("Something went wrong. Please try again.");
    }
  };

  return (
    <Layout heading="Add new user" subheading="Add a new user to the system:">
      <div className="col-md-6">
        <AddUserForm onSubmit={handleSubmit} />
      </div>
    </Layout>
  );
};
