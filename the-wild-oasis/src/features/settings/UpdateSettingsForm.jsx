import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

import Spinner from "../../ui/Spinner";
import { toast } from "sonner";
import { styled } from "styled-components";
import useCustomMutation from "../../hooks/useCustomMutation";
import useSettings from "./useSettings";

const Label = styled.label`
  font-weight: 500;
`;

function UpdateSettingsForm() {
  const {
    isLoading,
    error,
    data: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
  } = useSettings();
  const { isLoading: isUpdating, mutate: updateSetting } = useCustomMutation(
    updateSettingApi,
    ["settings"]
  );

  if (isLoading) return <Spinner />;

  if (error) {
    return toast.error(error.message);
  }

  return (
    <Form>
      <FormRow>
        <Label htmlFor="min-nights">Minimum nights/booking</Label>
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          disabled={isUpdating}
          onBlur={(e) => {
            console.log(e.target.value);
            if (!e.target.value || e.target.value < 1) return;
            updateSetting(
              { minBookingLength: e.target.value },
              {
                onSuccess: () => {
                  toast.success("Settings successfully updated");
                },
              }
            );
          }}
        />
      </FormRow>
      <FormRow>
        <Label htmlFor="max-nights">Maximum nights/booking</Label>
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          disabled={isUpdating}
          onBlur={(e) => {
            if (!e.target.value || e.target.value < 1) return;
            updateSetting(
              { maxBookingLength: e.target.value },
              {
                onSuccess: () => {
                  toast.success("Settings successfully updated");
                },
              }
            );
          }}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Label htmlFor="max-guests">Maximum guests/booking</Label>
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          disabled={isUpdating}
          onBlur={(e) => {
            if (!e.target.value || e.target.value < 1) return;
            updateSetting(
              { maxGuestsPerBooking: e.target.value },
              {
                onSuccess: () => {
                  toast.success("Settings successfully updated");
                },
              }
            );
          }}
          d
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Label htmlFor="breakfast-price">Breakfast price</Label>
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          disabled={isUpdating}
          onBlur={(e) => {
            if (!e.target.value || e.target.value < 1) return;
            updateSetting(
              { breakfastPrice: e.target.value },
              {
                onSuccess: () => {
                  toast.success("Settings successfully updated");
                },
              }
            );
          }}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
