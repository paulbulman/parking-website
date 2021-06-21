import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { useProfile } from "../../hooks/api/queries/profile";
import { useEditProfile } from "../../hooks/api/mutations/editProfile";
import { createInitialFormValues, createPatchValues } from "./utils";
import { EditProfileForm } from "../../components/EditProfileForm";
import { Loading } from "../../components/Loading";
import { Layout } from "../../components/Layout";
import { EditProfileFormValues } from "../../components/EditProfileForm/types";

export const EditProfilePage = () => {
  const history = useHistory();
  const { data, isLoading, isError } = useProfile();
  const { editProfile } = useEditProfile();

  const handleSubmit = async (values: EditProfileFormValues) => {
    const patchValues = createPatchValues(values);

    try {
      await editProfile(patchValues);
      toast("Profile updated successfully.");
      history.push("/registration-numbers");
    } catch {
      toast("Something went wrong. Please try again.");
    }
  };

  const handleCancel = () => {
    history.push("/registration-numbers");
  };

  var content = isLoading ? (
    <Loading />
  ) : isError ? (
    <div>Something went wrong. Please try again.</div>
  ) : (
    data && (
      <EditProfileForm
        initialValues={createInitialFormValues(data)}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    )
  );

  return (
    <Layout heading="Edit profile" subheading="Update your details below:">
      {content}
    </Layout>
  );
};
