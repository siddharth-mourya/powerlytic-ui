"use client";

import {
  GenericTable,
  TableColumn,
} from "@/app/_components/GenericTable/GenericTable";
import Button from "@/app/_components/Button/Button";
import { IDevice } from "@/app/_lib/_react-query-hooks/device/devices.types";
import { useDevicesListRQ } from "@/app/_lib/_react-query-hooks/device/useDevicesRQ";
import axios from "axios";
import { EyeIcon, PencilIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function DeviceListPage() {
  const router = useRouter();
  const { data: devices, refetch: refetchDevices } = useDevicesListRQ();

  const handleDelete = async (device: IDevice) => {
    if (!confirm(`Are you sure you want to delete ${device.name}?`)) return;
    try {
      await axios.delete(`/api/devices/${device._id}`);
      toast.success("Device deleted");
      refetchDevices();
    } catch {
      // toast.error(err?.response?.data?.message || err.message);
    }
  };

  const columns: TableColumn<IDevice>[] = [
    {
      header: "Name",
      cell: ({ row }) => {
        return (
          <Link
            href={`/dashboard/devices/${row.original._id}/values`}
            className="link link-info"
          >
            {row.original.name}
          </Link>
        );
      },
    },
    { header: "IMEI", accessorKey: "imei" },
    {
      header: "Model",
      accessorKey: "deviceModelId",
      cell: ({ row }) => row.original.deviceModelId?.name || "-",
    },
    {
      header: "Organization",
      accessorKey: "organizationId",
      cell: ({ row }) => row.original.organizationId?.name || "-",
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => {
        const status = row.original.status;
        const colors: Record<string, string> = {
          online: "bg-success/10 text-success",
          offline: "bg-error/10 text-error",
          maintenance: "bg-warning/10 text-warning",
        };
        return status ? (
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
              colors[status] || "bg-base-300 text-base-content"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        ) : (
          <span className="text-base-content/50">Not Available</span>
        );
      },
    },
    {
      header: "Last Seen",
      accessorKey: "lastSeen",
      cell: ({ row }) =>
        row.original.lastSeen
          ? new Date(row.original.lastSeen).toLocaleString()
          : "-",
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<EyeIcon className="w-4 h-4" />}
            onClick={() =>
              router.push(`/dashboard/devices/${row.original._id}`)
            }
          >
            View
          </Button>
          <Button
            variant="ghost"
            size="sm"
            leftIcon={<PencilIcon className="w-4 h-4" />}
            onClick={() =>
              router.push(`/dashboard/devices/${row.original._id}/edit`)
            }
          />
          <Button
            variant="ghost"
            size="sm"
            leftIcon={<Trash2Icon className="w-4 h-4 text-error" />}
            onClick={() => handleDelete(row.original)}
          />
        </div>
      ),
    },
  ];

  return (
    // <SectionWrapper>
    <GenericTable data={(devices as IDevice[]) ?? []} columns={columns} />
    // </SectionWrapper>
  );
}
