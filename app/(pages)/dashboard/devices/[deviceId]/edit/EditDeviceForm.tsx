"use client";

import Button from "@/app/_components/Button/Button";
import { Card, CardContent, CardTitle } from "@/app/_components/Card/Card";
import { TextInput } from "@/app/_components/Inputs/TextInput";
import { SectionWrapper } from "@/app/_components/SectionWrapper/SectionWrapper";
import {
  useDeviceByIdRQ,
  useUpdateDeviceMutation,
} from "@/app/_lib/_react-query-hooks/device/useDevicesRQ";
import { RoleProtectedGuard } from "@/app/_lib/utils/rbac/RoleProtectedGuard";
import { Actions, Resources } from "@/app/_lib/utils/rbac/resources";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import {
  IDevice,
  IPort,
} from "@/app/_lib/_react-query-hooks/device/devices.types";
import { IPortGroupWithIndex, PortGroup } from "./components/PortGroup";
import { ModbusPortsSection } from "./components/modbus/ModbusPortsSection";

/**
 * Filter and map ports by key prefix, preserving original indices
 */
function filterPortsByPrefix(
  ports: IPort[] | undefined,
  prefix: string,
): IPortGroupWithIndex {
  if (!ports) return [];
  return ports
    .map((p, idx) =>
      p.portKey.startsWith(prefix) ? { ...p, originalIndex: idx } : null,
    )
    .filter((p): p is IPort & { originalIndex: number } => p !== null);
}

export function EditDeviceForm({ deviceId }: { deviceId: string }) {
  const { data: device, isLoading } = useDeviceByIdRQ(deviceId);
  const updateDevice = useUpdateDeviceMutation(deviceId);

  const form = useForm<IDevice>({
    defaultValues: {
      alertEmails: [],
      alertPhones: [],
    },
    shouldFocusError: false,
    mode: "onChange",
  });
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = form;

  const {
    fields: emailFields,
    append: addEmail,
    remove: removeEmail,
  } = useFieldArray({
    control,
    // @ts-expect-error: react-hook-form string[] field array type inference limitation
    name: "alertEmails",
  });

  const {
    fields: phoneFields,
    append: addPhone,
    remove: removePhone,
  } = useFieldArray({
    control,
    // @ts-expect-error: react-hook-form string[] field array type inference limitation
    name: "alertPhones",
  });

  useEffect(() => {
    if (device) reset(device);
  }, [device, reset]);

  const onSubmit = async (values: IDevice) => {
    console.log("Submitting", values);
    if (Object.keys(errors).length > 0) {
      console.warn("Form has validation errors:", errors);
      return;
    }
    await updateDevice.mutate({
      name: values.name,
      status: values.status,
      pointOfContact: values.pointOfContact,
      alertEmails: values.alertEmails,
      alertPhones: values.alertPhones,
      location: values.location,
      metadata: values.metadata,
      ports: values.ports,
    });
  };

  console.log("Rendering EditDeviceForm", { device, isLoading });
  if (isLoading) return <p>Loading...</p>;

  return (
    <RoleProtectedGuard resource={Resources.DEVICES} action={Actions.EDIT}>
      <SectionWrapper>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8"
          noValidate
        >
          {/* Device Info */}
          <Card>
            <CardTitle className="px-6 pt-6">
              Editing - {device?.name}
            </CardTitle>
            <CardContent className="p-6 space-y-4">
              <TextInput label="Device Name" {...register("name")} />
              <select
                {...register("status")}
                className="select select-bordered"
              >
                <option value="online">Online</option>
                <option value="offline">Offline</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </CardContent>
          </Card>

          {/* Ports */}
          <Card>
            <CardContent className="p-6 space-y-6">
              <PortGroup
                title="Digital Inputs"
                color="border-blue-300"
                ports={filterPortsByPrefix(device?.ports, "DI")}
                register={register}
              />
              <PortGroup
                title="Analog Inputs"
                color="border-green-300"
                ports={filterPortsByPrefix(device?.ports, "AI")}
                register={register}
              />
              <ModbusPortsSection
                control={form.control}
                ports={filterPortsByPrefix(device?.ports, "MI")}
                register={register}
              />
            </CardContent>
          </Card>

          {/* Alerts */}
          <Card className="flex flex-wrap">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold text-gray-700">Alert Emails</h3>
              {emailFields.map((field, i) => (
                <div key={field.id} className="flex items-center gap-2">
                  <TextInput
                    {...register(`alertEmails.${i}`)}
                    placeholder="email@example.com"
                  />
                  <Button
                    type="button"
                    variant="danger"
                    size="sm"
                    onClick={() => removeEmail(i)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => (addEmail as (val: unknown) => void)("")}
              >
                + Add Email
              </Button>
            </CardContent>

            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold text-gray-700">Alert Phones</h3>
              {phoneFields.map((field, i) => (
                <div key={field.id} className="flex items-center gap-2">
                  <TextInput
                    {...register(`alertPhones.${i}`)}
                    placeholder="+91 9876543210"
                  />
                  <Button
                    type="button"
                    variant="danger"
                    size="sm"
                    onClick={() => removePhone(i)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => (addPhone as (val: unknown) => void)("")}
              >
                + Add Phone
              </Button>
            </CardContent>
          </Card>

          <Button
            disabled={!form.formState.isDirty}
            type="submit"
            loading={updateDevice.isPending}
          >
            Save Changes
          </Button>
        </form>
      </SectionWrapper>
    </RoleProtectedGuard>
  );
}
