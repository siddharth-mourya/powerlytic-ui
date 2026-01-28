"use client";

import Button from "@/app/_components/Button/Button";
import { TextArea } from "@/app/_components/Inputs/Textarea";
import { TextInput } from "@/app/_components/Inputs/TextInput";
import { NewOrganizationParams } from "@/app/_lib/_react-query-hooks/organizations/organizations.types";
import { useOrganizationsMutation } from "@/app/_lib/_react-query-hooks/organizations/useOrganizationsMutation";
import { useForm } from "react-hook-form";
import {
  FormGroup,
  FormRow,
  ActionsBar,
} from "@/app/_components/layout/LayoutHelpers";

const defaultValues: NewOrganizationParams = {
  name: "",
  address: "",
  orgEmail: "",
  orgPhone: "",
};

export default function OrganizationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewOrganizationParams>({
    defaultValues,
  });

  const { mutate } = useOrganizationsMutation();

  const onSubmit = (data: NewOrganizationParams) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl">
      <FormGroup>
        <div>
          <label className="block text-sm font-semibold text-base-content mb-2">
            Organization Name
            <span className="text-error ml-1">*</span>
          </label>
          <TextInput
            {...register("name", {
              required: "Organization name is required",
            })}
            placeholder="e.g., Acme Corp"
            error={errors.name?.message}
          />
        </div>

        <FormRow>
          <div>
            <label className="block text-sm font-semibold text-base-content mb-2">
              Email
              <span className="text-error ml-1">*</span>
            </label>
            <TextInput
              {...register("orgEmail", {
                required: "Organization Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              placeholder="contact@example.com"
              error={errors.orgEmail?.message}
              type="email"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-base-content mb-2">
              Phone
              <span className="text-error ml-1">*</span>
            </label>
            <TextInput
              {...register("orgPhone", {
                required: "Organization Phone is required",
              })}
              placeholder="+1 (555) 000-0000"
              error={errors.orgPhone?.message}
              type="tel"
            />
          </div>
        </FormRow>

        <div>
          <label className="block text-sm font-semibold text-base-content mb-2">
            Address
          </label>
          <TextArea
            {...register("address")}
            placeholder="123 Business St, Suite 100, City, State 12345"
            description="Enter the organization's physical address"
          />
        </div>
      </FormGroup>

      <ActionsBar>
        <Button variant="outline">Cancel</Button>
        <Button type="submit" variant="primary">
          Save Organization
        </Button>
      </ActionsBar>
    </form>
  );
}
