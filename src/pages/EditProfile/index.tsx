import { useState } from "react";
import { Prompt } from "react-router-dom";
import { useProfile } from "../../hooks/api/queries/profile";
import { useEditProfile } from "../../hooks/api/mutations/editProfile";
import { error, success } from "../../utils/notifications";
import { createInitialFormValues, createPatchValues } from "./utils";
import { EditProfileForm } from "../../components/EditProfileForm";
import { Loading } from "../../components/Loading";
import { Layout } from "../../components/Layout";
import { EditProfileFormValues } from "../../components/EditProfileForm/types";

export const EditProfilePage = () => {
  const [isChanged, setIsChanged] = useState(false);

  const { data, isLoading, isError } = useProfile();
  const { editProfile } = useEditProfile();

  const handleChange = () => {
    setIsChanged(true);
  };

  const handleSubmit = async (values: EditProfileFormValues) => {
    const patchValues = createPatchValues(values);

    try {
      await editProfile(patchValues);
      setIsChanged(false);
      success("Profile updated successfully.");
    } catch {
      error("Something went wrong. Please try again.");
    }
  };

  var content = isLoading ? (
    <Loading />
  ) : isError ? (
    <div>Something went wrong. Please try again.</div>
  ) : (
    data && (
      <EditProfileForm
        initialValues={createInitialFormValues(data)}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    )
  );

  return (
    <>
      <Prompt
        when={isChanged}
        message="Are you sure? You currently have unsaved changes."
      />
      <Layout heading="Edit profile" subheading="Update your details below:">
        <div className="columns">
          <div className="column is-half">{content}</div>
        </div>
      </Layout>
    </>
  );
};
