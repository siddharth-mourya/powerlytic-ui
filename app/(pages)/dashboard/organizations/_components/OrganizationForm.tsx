"use client";

import Button from "@/app/_components/Button/Button";
import { TextArea } from "@/app/_components/Inputs/Textarea";
import { TextInput } from "@/app/_components/Inputs/TextInput";
import { NewOrganizationParams } from "@/app/_lib/_react-query-hooks/organizations/organizations.types";
import { useOrganizationsMutation } from "@/app/_lib/_react-query-hooks/organizations/useOrganizationsMutation";
import { useForm } from "react-hook-form";

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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-xl">
      <div>
        <label className="block text-sm font-medium">Name</label>
        <TextInput
          {...register("name", { required: "Organization name is required" })}
          placeholder="Organization Name"
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Org Email</label>
        <TextInput
          {...register("orgEmail", {
            required: "Organization Email is required",
          })}
          placeholder="Organization Email"
        />
        {errors.orgEmail && (
          <p className="text-red-500 text-xs mt-1">{errors.orgEmail.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Org Phone</label>
        <TextInput
          {...register("orgPhone", {
            required: "Organization Phone is required",
          })}
          placeholder="Organization Phone"
        />
        {errors.orgPhone && (
          <p className="text-red-500 text-xs mt-1">{errors.orgPhone.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Address</label>
        <TextArea {...register("address")} placeholder="Address" />
      </div>

      <Button type="submit">Save</Button>
    </form>
  );
}
