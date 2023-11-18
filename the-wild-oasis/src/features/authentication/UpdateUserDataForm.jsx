import { useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Label from "../../ui/FormLabel";
import useUser from "./useUser";
import { useUpdateUser } from "./useUpdateUser";
import { toast } from "sonner";
// import toast from "react-hot-toast";
function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point

  const { isUpdating, updateUser } = useUpdateUser();
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useUser();

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (!fullName) return;
    updateUser(
      { fullName, avatar },
      {
        onSuccess: () => {
          setAvatar(null);
          e.target.reset();
          toast.success("User account successfully updated");
        },
      }
    );
  }

  function handleCancel() {
    setAvatar(null);
    setFullName(currentFullName);
  }
  return (
    <Form onSubmit={handleSubmit}>
      <FormRow>
        <Label>Email Address</Label>
        <Input value={email} disabled />
      </FormRow>
      <FormRow>
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          required
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
        />
      </FormRow>
      <FormRow>
        <Label htmlFor="avatar">Avatar image</Label>
        <FileInput
          id="avatar"
          disabled={isUpdating}
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
        />
      </FormRow>
      <FormRow>
        <Button
          onClick={handleCancel}
          disabled={isUpdating}
          type="reset"
          variation="secondary"
        >
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
