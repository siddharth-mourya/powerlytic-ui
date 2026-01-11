"use client";

import { Badge } from "@/app/_components/Badge/Badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/Card/Card";
import { SectionWrapper } from "@/app/_components/SectionWrapper/SectionWrapper";
import {
  useDeviceByIdRQ,
  useUpdateDeviceOrgRQ,
} from "@/app/_lib/_react-query-hooks/device/useDevicesRQ";
import { Organization } from "@/app/_lib/_react-query-hooks/organizations/organizations.types";
import { api } from "@/app/_lib/api/axios";
import { RoleProtectedGuard } from "@/app/_lib/utils/rbac/RoleProtectedGuard";
import { Actions, Resources } from "@/app/_lib/utils/rbac/resources";
import { useQuery } from "@tanstack/react-query";
import {
  Calendar,
  Calendar1,
  Cpu,
  CpuIcon,
  EyeIcon,
  Loader2,
  MapPin,
  Network,
  PencilIcon,
  Smartphone,
  SmartphoneIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface DeviceDetailsPageProps {
  deviceId: string;
}

export function DeviceDetails({ deviceId }: DeviceDetailsPageProps) {
  const { data: device, isLoading: deviceLoading } = useDeviceByIdRQ(deviceId);
  const router = useRouter();

  const { data: organizations } = useQuery<Organization[]>({
    queryKey: ["organizations"],
    queryFn: async () => {
      const res = await api.get("/organizations");
      if (res.status !== 200) throw new Error("Failed to fetch organizations");
      return res.data;
    },
  });

  const [selectedOrg, setSelectedOrg] = useState("");
  const updateOrgMutation = useUpdateDeviceOrgRQ(deviceId);

  const handleAssociateOrg = async () => {
    if (!selectedOrg) return;
    const confirmed = confirm(
      "⚠️ Associating this device to an organization is sensitive. Proceed?"
    );
    if (!confirmed) return;
    updateOrgMutation.mutate({ organizationId: selectedOrg });
  };

  if (deviceLoading)
    return (
      <div className="flex items-center justify-center h-48">
        <Loader2 className="animate-spin w-6 h-6 text-primary" />
      </div>
    );

  if (!device)
    return <p className="text-center text-gray-500">Device not found</p>;

  return (
    <RoleProtectedGuard resource={Resources.DEVICES} action={Actions.VIEW}>
      <SectionWrapper>
        {/* Header */}
        <div className="flex justify-between items-start mb-6 flex-wrap gap-2">
          <div>
            <h1 className="text-xl font-semibold">{device.name}</h1>
            <p className="text-sm text-gray-500 flex items-center gap-2">
              <Smartphone size={14} />
              IMEI: {device.imei}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              className="btn btn-sm btn-outline"
              onClick={() =>
                router.push(`/dashboard/devices/${device._id}/values`)
              }
            >
              All values <EyeIcon className="w-3 h-3" />
            </button>
            <button
              className="btn btn-sm btn-primary"
              onClick={() =>
                router.push(`/dashboard/devices/${device._id}/edit`)
              }
            >
              <PencilIcon className="w-3 h-3" />
            </button>
            <Badge variant={device.status === "online" ? "success" : "error"}>
              {device.status || "offline"}
            </Badge>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          <Card className="text-center py-3">
            <CardContent>
              <Cpu className="w-5 h-5 mx-auto text-primary mb-1" />
              <p className="text-xs text-gray-500">Model</p>
              <p className="text-base font-semibold">
                {device.deviceModelId?.name || "-"}
              </p>
            </CardContent>
          </Card>
          <Card className="text-center py-3">
            <CardContent>
              <Network className="w-5 h-5 mx-auto text-primary mb-1" />
              <p className="text-xs text-gray-500">Organization</p>
              <p className="text-base font-semibold">
                {device.organizationId?.name || "Unassigned"}
              </p>
            </CardContent>
          </Card>
          <Card className="text-center py-3">
            <CardContent>
              <Calendar className="w-5 h-5 mx-auto text-primary mb-1" />
              <p className="text-xs text-gray-500">Manufactured</p>
              <p className="text-base font-semibold">
                {device.manufacturingYear || "N/A"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Info grid */}
        <Card className="mb-5 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-gray-800">
              Device Information
            </CardTitle>
          </CardHeader>
          <CardContent className="grid sm:grid-cols-2 gap-4 text-sm">
            <InfoRow
              label="IMEI"
              value={device.imei}
              icon={<SmartphoneIcon className="w-4 h-4 text-primary" />}
            />
            <InfoRow
              label="Model"
              value={device.deviceModelId?.name}
              icon={<CpuIcon className="w-4 h-4 text-primary" />}
            />
            <InfoRow
              label="Last Seen"
              value={
                device.lastSeen
                  ? new Date(device.lastSeen).toLocaleString()
                  : "Never"
              }
              icon={<Calendar1 className="w-4 h-4 text-primary" />}
            />
            <InfoRow
              label="Location"
              value={
                device.location?.address
                  ? `${device.location.address}`
                  : "Not Available"
              }
              icon={<MapPin className="w-4 h-4 text-primary" />}
            />
          </CardContent>
        </Card>

        {/* Organization association */}
        <Card className="mb-5 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-gray-800">
              Associate with Organization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 items-end">
              <select
                className="select select-bordered w-full sm:max-w-xs"
                value={selectedOrg}
                onChange={(e) => setSelectedOrg(e.target.value)}
              >
                <option value="">Select Organization</option>
                {organizations?.map((org) => (
                  <option key={org._id} value={org._id}>
                    {org.name}
                  </option>
                ))}
              </select>
              <button
                onClick={handleAssociateOrg}
                disabled={!selectedOrg || updateOrgMutation.isPending}
                className={`btn btn-primary ${
                  updateOrgMutation.isPending ? "loading" : ""
                }`}
              >
                Associate
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Ports */}
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-gray-800">
              Ports Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            {device.ports?.length ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {device.ports.map((port) => (
                  <div
                    key={port.portKey}
                    className="p-3 border border-gray-200 rounded-lg bg-gray-50 hover:bg-white hover:shadow-sm transition"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-medium text-sm">{port.name}</h4>
                      <Badge
                        variant={
                          port.status === "ACTIVE" ? "success" : "neutral"
                        }
                      >
                        {port.status || "INACTIVE"}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500 mb-1">
                      Port #{port.portKey}
                    </p>
                    <div className="text-xs space-y-1 text-gray-600">
                      {port.unit && <p>Unit: {port.unit}</p>}
                      {port.calibrationValue && (
                        <p>
                          Scaling: {port.calibrationValue.scaling}, Offset:{" "}
                          {port.calibrationValue.offset}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No ports configured yet.</p>
            )}
          </CardContent>
        </Card>
      </SectionWrapper>
    </RoleProtectedGuard>
  );
}

// 🔹 Reusable small info component
function InfoRow({
  label,
  value,
  icon,
}: {
  label: string;
  value?: string | React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-2">
      {icon && <div className="mt-0.5">{icon}</div>}
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="font-medium text-sm text-gray-800">{value || "-"}</p>
      </div>
    </div>
  );
}
