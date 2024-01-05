import { useState } from "react";
import { Prompt } from "../../hooks/prompt";
import { useProfile } from "../../hooks/api/queries/profile";
import { useEditProfile } from "../../hooks/api/mutations/editProfile";
import { error, success } from "../../utils/notifications";
import { createInitialFormValues, createPatchValues } from "./utils";
import { EditProfileForm } from "../../components/EditProfileForm";
import { Loading } from "../../components/Loading";
import { Layout } from "../../components/Layout";
import { EditProfileFormValues } from "../../components/EditProfileForm/types";
import { useAuthContext } from "../../hooks/context/auth";

export const EditProfilePage = () => {
  const [isChanged, setIsChanged] = useState(false);
  const { getGroups } = useAuthContext();
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

  const groups = getGroups();

  var content = isLoading ? (
    <Loading />
  ) : isError ? (
    <div>Something went wrong. Please try again.</div>
  ) : (
    data && (
      <EditProfileForm
        groups={groups}
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
