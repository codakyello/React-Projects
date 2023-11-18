import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useForm } from "react-hook-form";
import Error from "../../ui/Error";

import styled from "styled-components";
import { useSignUp } from "./useSignup";
const Label = styled.label`
  font-weight: 500;
`;
// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { signup, isLoading } = useSignUp();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  function onSubmit({ fullName, email, password }) {
    signup({ fullName, email, password }, { onSettled: reset });
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Label htmlFor="fullName">User name</Label>
        <Input
          type="text"
          id="fullName"
          disabled={isLoading}
          {...register("fullName", { required: "This field is required" })}
        />
        {errors?.fullName?.message && <Error>{errors.fullName.message}</Error>}
      </FormRow>

      <FormRow label="Email address" error={""}>
        <Label htmlFor="email">Email address</Label>
        <Input
          type="email"
          id="email"
          disabled={isLoading}
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
        />
        {errors?.email?.message && <Error>{errors.email.message}</Error>}
      </FormRow>

      <FormRow label="Password (min 8 characters)" error={""}>
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          disabled={isLoading}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
        {errors?.password?.message && <Error>{errors.password.message}</Error>}
      </FormRow>

      <FormRow label="Repeat password">
        <Label htmlFor="passwordConfirm">Repeat password</Label>
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isLoading}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "Passwords need to match",
          })}
        />
        {errors?.passwordConfirm?.message && (
          <Error>{errors.passwordConfirm.message}</Error>
        )}
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" disabled={isLoading} type="reset">
          Cancel
        </Button>
        <Button disabled={isLoading}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
