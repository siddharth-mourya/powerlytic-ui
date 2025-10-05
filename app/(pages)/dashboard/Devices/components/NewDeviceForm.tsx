"use client";

import { SectionWrapper } from "@/app/_components/SectionWrapper/SectionWrapper";
import { useCreateDeviceMutation } from "@/app/_lib/_react-query-hooks/device/useDevicesRQ";
import { useDeviceModelsListRQ } from "@/app/_lib/_react-query-hooks/deviceModels/useDeviceModelsList";
import { RoleProtectedGuard } from "@/app/_lib/utils/rbac/RoleProtectedGuard";
import { Actions, Resources } from "@/app/_lib/utils/rbac/resources";
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

  return (
    <RoleProtectedGuard resource={Resources.DEVICES} action={Actions.CREATE}>
      <SectionWrapper>
        <form
          className="bg-base-200 flex flex-col md:flex-row gap-4 items-end"
          onSubmit={handleSubmit}
        >
          <div className="flex-1">
            <label className="label">
              <span className="label-text">Device Name</span>
            </label>
            <input
              className="input input-bordered w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="flex-1">
            <label className="label">
              <span className="label-text">IMEI</span>
            </label>
            <input
              className="input input-bordered w-full"
              value={imei}
              onChange={(e) => setImei(e.target.value)}
              required
            />
          </div>
          <div className="flex-1">
            <label className="label">
              <span className="label-text">Device Model</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={deviceModelId}
              onChange={(e) => setDeviceModelId(e.target.value)}
              required
            >
              <option value="">Select model</option>
              {models?.map((m) => (
                <option key={m._id} value={m._id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>
          <button
            className={`btn btn-primary ${isLoading ? "loading" : ""}`}
            type="submit"
          >
            Add Device
          </button>
        </form>
      </SectionWrapper>
    </RoleProtectedGuard>
  );
}
