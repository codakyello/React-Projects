import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { toast } from "sonner";
import Error from "../../ui/Error";
import FormLabel from "../../ui/FormLabel";
import { useUpdateUser } from "./useUpdateUser";

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  const { isUpdating, updateUser } = useUpdateUser();

  function onSubmit({ password }) {
    updateUser(
      { password },
      {
        onSuccess: () => toast.success("User password successfully updated"),
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <FormLabel htmlFor="password">Password (min 8 characters)</FormLabel>
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isUpdating}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
        <Error>{errors?.password?.message}</Error>
      </FormRow>

      <FormRow>
        <FormLabel htmlFor="passwordConfirm">Confirm Password</FormLabel>
        <Input
          type="password"
          autoComplete="new-password"
          id="passwordConfirm"
          disabled={isUpdating}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              getValues().password === value || "Passwords need to match",
          })}
        />
        <Error>{errors?.passwordConfirm?.message}</Error>
      </FormRow>
      <FormRow>
        <Button onClick={reset} type="reset" variation="secondary">
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update password</Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
