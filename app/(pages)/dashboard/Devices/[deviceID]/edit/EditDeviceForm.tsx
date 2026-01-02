"use client";

import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import {
  useDeviceByIdRQ,
  useUpdateDeviceMutation,
} from "@/app/_lib/_react-query-hooks/device/useDevicesRQ";
import { SectionWrapper } from "@/app/_components/SectionWrapper/SectionWrapper";
import { RoleProtectedGuard } from "@/app/_lib/utils/rbac/RoleProtectedGuard";
import { Actions, Resources } from "@/app/_lib/utils/rbac/resources";
import { Card, CardContent } from "@/app/_components/Card/Card";
import { TextInput } from "@/app/_components/Inputs/TextInput";
import { TextArea } from "@/app/_components/Inputs/Textarea";
import Button from "@/app/_components/Button/Button";
import { UpdateDeviceDTO } from "@/app/_lib/_react-query-hooks/device/devices.types";

interface EditDeviceFormProps {
  deviceId: string;
}

export function EditDeviceForm({ deviceId }: EditDeviceFormProps) {
  const { data: device, isLoading } = useDeviceByIdRQ(deviceId);
  const updateDevice = useUpdateDeviceMutation(deviceId);

  const form = useForm({
    defaultValues: {
      name: "",
      status: "offline",
      pointOfContact: "",
      alertEmails: [""],
      alertPhones: [""],
      metadata: {},
      location: { lat: "", lng: "", address: "" },
      ports: [],
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting },
  } = form;

  const {
    fields: emailFields,
    append: appendEmail,
    remove: removeEmail,
  } = useFieldArray({
    control,
    name: "alertEmails",
  });

  const {
    fields: phoneFields,
    append: appendPhone,
    remove: removePhone,
  } = useFieldArray({
    control,
    name: "alertPhones",
  });

  useEffect(() => {
    if (device) {
      reset({
        name: device.name,
        status: device.status,
        pointOfContact: device.pointOfContact || "",
        alertEmails: device.alertEmails || [""],
        alertPhones: device.alertPhones || [""],
        metadata: device.metadata || {},
        location: device.location || { lat: "", lng: "", address: "" },
        ports: device.ports || [],
      });
    }
  }, [device, reset]);

  const onSubmit = (values: unknown) => {
    // updateDevice.mutate(values as UpdateDeviceDTO);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <RoleProtectedGuard resource={Resources.DEVICES} action={Actions.EDIT}>
      <SectionWrapper>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Device Info */}
          <Card>
            <CardContent className="space-y-4 p-6">
              <h2 className="text-lg font-semibold text-gray-700">
                Device Info
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label>Name</label>
                  <TextInput {...register("name")} placeholder="Device Name" />
                </div>
                <div>
                  <label>Status</label>
                  <select
                    {...register("status")}
                    className="select select-bordered w-full"
                  >
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                </div>
              </div>
              <div>
                <label>Point of Contact</label>
                <TextInput
                  {...register("pointOfContact")}
                  placeholder="Contact Name / Email"
                />
              </div>
            </CardContent>
          </Card>

          {/* Ports Configuration */}
          <Card>
            <CardContent className="space-y-4 p-6">
              <h2 className="text-lg font-semibold text-gray-700">
                Ports Configuration
              </h2>
              {device?.ports?.length ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {device.ports.map((port, index) => (
                    <div
                      key={port.portNumber}
                      className="border p-4 rounded-lg space-y-3"
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">{port.name}</h3>
                        <span
                          className={`badge ${
                            port.status === "ACTIVE"
                              ? "badge-primary"
                              : "badge-outline"
                          }`}
                        >
                          {port.status || "INACTIVE"}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label>Status</label>
                          <select
                            {...register(`ports.${index}.status`)}
                            defaultValue={port.status}
                            className="select select-bordered w-full"
                          >
                            <option value="ACTIVE">Active</option>
                            <option value="INACTIVE">Inactive</option>
                          </select>
                        </div>
                        <div>
                          <label>Unit</label>
                          <TextInput
                            {...register(`ports.${index}.unit`)}
                            defaultValue={port.unit || ""}
                          />
                        </div>
                        <div>
                          <label>Scaling</label>
                          <TextInput
                            type="number"
                            step="any"
                            {...register(
                              `ports.${index}.calibrationValue.scaling`
                            )}
                            defaultValue={port.calibrationValue?.scaling ?? 1}
                          />
                        </div>
                        <div>
                          <label>Offset</label>
                          <TextInput
                            type="number"
                            step="any"
                            {...register(
                              `ports.${index}.calibrationValue.offset`
                            )}
                            defaultValue={port.calibrationValue?.offset ?? 0}
                          />
                        </div>
                      </div>

                      {/* Thresholds */}
                      <div className="pt-2 border-t">
                        <label>Thresholds</label>
                        <div className="grid grid-cols-3 gap-2">
                          <TextInput
                            type="number"
                            step="any"
                            placeholder="Min"
                            {...register(`ports.${index}.thresholds.min`)}
                            defaultValue={port.thresholds?.min ?? ""}
                          />
                          <TextInput
                            type="number"
                            step="any"
                            placeholder="Max"
                            {...register(`ports.${index}.thresholds.max`)}
                            defaultValue={port.thresholds?.max ?? ""}
                          />
                          <TextInput
                            placeholder="Message"
                            {...register(`ports.${index}.thresholds.message`)}
                            defaultValue={port.thresholds?.message ?? ""}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No ports found for this device model.</p>
              )}
            </CardContent>
          </Card>

          {/* Metadata */}
          <Card>
            <CardContent className="space-y-4 p-6">
              <h2 className="text-lg font-semibold text-gray-700">
                Device Metadata
              </h2>
              <TextArea
                {...register("metadata.info")}
                placeholder="Enter metadata as JSON or plain text"
              />
            </CardContent>
          </Card>

          {/* Alerts */}
          <Card>
            <CardContent className="space-y-4 p-6">
              <h2 className="text-lg font-semibold text-gray-700">
                Alerts & Notifications
              </h2>

              <div>
                <label>Alert Emails</label>
                {emailFields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-2 mb-2">
                    <TextInput
                      {...register(`alertEmails.${index}`)}
                      placeholder="email@example.com"
                    />
                    <Button
                      type="button"
                      size="sm"
                      variant="danger"
                      onClick={() => removeEmail(index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => appendEmail("")}
                >
                  + Add Email
                </Button>
              </div>

              <div>
                <label>Alert Phones</label>
                {phoneFields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-2 mb-2">
                    <TextInput
                      {...register(`alertPhones.${index}`)}
                      placeholder="+91 9876543210"
                    />
                    <Button
                      type="button"
                      size="sm"
                      variant="danger"
                      onClick={() => removePhone(index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => appendPhone("")}
                >
                  + Add Phone
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card>
            <CardContent className="space-y-4 p-6">
              <h2 className="text-lg font-semibold text-gray-700">
                Device Location
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label>Latitude</label>
                  <TextInput
                    type="number"
                    step="any"
                    {...register("location.lat")}
                  />
                </div>
                <div>
                  <label>Longitude</label>
                  <TextInput
                    type="number"
                    step="any"
                    {...register("location.lng")}
                  />
                </div>
                <div>
                  <label>Address</label>
                  <TextInput
                    {...register("location.address")}
                    placeholder="Enter address"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting || updateDevice.isPending}
            >
              {updateDevice.isPending ? "Updating..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </SectionWrapper>
    </RoleProtectedGuard>
  );
}
