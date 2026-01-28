"use client";

import { SectionWrapper } from "@/app/_components/SectionWrapper/SectionWrapper";
import Button from "@/app/_components/Button/Button";
import { TextInput } from "@/app/_components/Inputs/TextInput";
import { Select } from "@/app/_components/Inputs/Select";
import { useCreateDeviceMutation } from "@/app/_lib/_react-query-hooks/device/useDevicesRQ";
import { useDeviceModelsListRQ } from "@/app/_lib/_react-query-hooks/deviceModels/useDeviceModelsList";
import { RoleProtectedGuard } from "@/app/_lib/utils/rbac/RoleProtectedGuard";
import { Actions, Resources } from "@/app/_lib/utils/rbac/resources";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function NewDeviceForm() {
  const [name, setName] = useState("");
  const [imei, setImei] = useState("");
  const [deviceModelId, setDeviceModelId] = useState("");

  const { data: models } = useDeviceModelsListRQ();
  const { mutate: createNewDevice, isPending: isLoading } =
    useCreateDeviceMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    createNewDevice({ name, imei, deviceModelId });
  };

  const modelOptions =
    models?.map((m) => ({
      value: m._id,
      label: m.name,
    })) || [];

  return (
    <RoleProtectedGuard resource={Resources.DEVICES} action={Actions.CREATE}>
      <SectionWrapper>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TextInput
              label="Device Name"
              placeholder="e.g., Device-001"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <TextInput
              label="IMEI"
              placeholder="Enter IMEI"
              value={imei}
              onChange={(e) => setImei(e.target.value)}
              required
            />
            <Select
              label="Device Model"
              options={modelOptions}
              value={deviceModelId}
              onChange={(e) => setDeviceModelId(e.target.value)}
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
