import styled from "styled-components";
import PropTypes from "prop-types";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import useCustomMutation from "../../hooks/useCustomMutation";
import { createEditCabin } from "../../services/apiCabins";
import { toast } from "sonner";
import FormRow from "../../ui/FormRow";
import Error from "../../ui/Error";

CreateCabinForm.propTypes = {
  cabinToEdit: PropTypes.object,
  onClose: PropTypes.func,
};

const Label = styled.label`
  font-weight: 500;
`;

function CreateCabinForm({ cabinToEdit = {}, onClose }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { errors } = formState;

  const { isLoading, mutate: AddEditCabin } = useCustomMutation(
    function ({ newCabinData, id }) {
      return createEditCabin(newCabinData, id);
    },
    ["cabins"]
  );

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession)
      AddEditCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            reset();
            toast.success("Cabin successfully edited");
            onClose?.();
          },
        }
      );
    else {
      AddEditCabin(
        { newCabinData: { ...data, image: image } },
        {
          onSuccess: () => {
            reset();
            toast.success("Cabin successfully added");
            onClose?.();
          },
        }
      );
    }
  }

  function onError() {
    // Form Error function incase of error
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onClose ? "modal" : "regular"}
    >
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input
          disabled={isLoading}
          type="text"
          id="name"
          {...register("name", { required: "This field is required" })}
        />
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input
          disabled={isLoading}
          type="number"
          id="maxCapacity"
          {...register("maxGuests", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
        {errors?.maxGuests?.message && (
          <Error>{errors.maxGuests.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input
          disabled={isLoading}
          type="number"
          id="regularPrice"
          {...register("price", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Price cannot be less than 1",
            },
          })}
        />
        {errors?.price?.message && <Error>{errors.price.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input
          disabled={isLoading}
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            min: {
              value: 0,
              message: "Discount cannot be less than 0",
            },
            validate: (value) =>
              value <= getValues().price ||
              "Discount should be less than regular price",
          })}
        />
        {errors?.discount?.message && <Error>{errors.discount.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea
          disabled={isLoading}
          type="number"
          id="description"
          defaultValue={editValues.description}
          {...register("description")}
        />
        {errors?.description?.message && (
          <Error>{errors.description.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
        {errors?.image?.message && <Error>{errors.image.message}</Error>}
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button onClick={() => onClose?.()} variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isLoading}>
          {isEditSession ? "Edit cabin" : "Create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
