"use client";

import { SectionWrapper } from "@/app/_components/SectionWrapper/SectionWrapper";
import Button from "@/app/_components/Button/Button";
import { TextInput } from "@/app/_components/Inputs/TextInput";
import { Select } from "@/app/_components/Inputs/Select";
import {
  CreateDeviceDTO,
  useCreateDeviceMutation,
} from "@/app/_lib/_react-query-hooks/device/useDevicesRQ";
import { useDeviceModelsListRQ } from "@/app/_lib/_react-query-hooks/deviceModels/useDeviceModelsList";
import { RoleProtectedGuard } from "@/app/_lib/utils/rbac/RoleProtectedGuard";
import { Actions, Resources } from "@/app/_lib/utils/rbac/resources";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";

export default function NewDeviceForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateDeviceDTO>({
    mode: "onSubmit",
    shouldFocusError: true,
    defaultValues: {
      name: "",
      imei: "",
      deviceModelId: "",
    },
  });

  const { data: models } = useDeviceModelsListRQ();
  const { mutate: createNewDevice, isPending: isLoading } =
    useCreateDeviceMutation();

  const onSubmit = async (data: CreateDeviceDTO) => {
    createNewDevice(data);
    reset();
  };

  const modelOptions =
    models?.map((m) => ({
      value: m._id,
      label: m.name,
    })) || [];

  return (
    <RoleProtectedGuard resource={Resources.DEVICES} action={Actions.CREATE}>
      <SectionWrapper>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          noValidate
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TextInput
              label="Device Name"
              placeholder="e.g., Device-001"
              error={errors.name?.message}
              {...register("name", {
                required: "Device name is required",
              })}
              required
            />
            <TextInput
              label="IMEI"
              placeholder="Enter IMEI"
              error={errors.imei?.message}
              {...register("imei", {
                required: "IMEI is required",
              })}
              required
            />
            <Select
              label="Device Model"
              options={modelOptions}
              error={errors.deviceModelId?.message}
              {...register("deviceModelId", {
                required: "Device Model is required",
              })}
              required
            />
          </div>
          <div className="flex gap-3 justify-end pt-2 border-t border-base-300">
            <Button
              type="submit"
              leftIcon={<Plus className="h-4 w-4" />}
              loading={isLoading}
              variant="primary"
            >
              Add Device
            </Button>
          </div>
        </form>
      </SectionWrapper>
    </RoleProtectedGuard>
  );
}
