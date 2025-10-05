"use client";

import {
  GenericTable,
  TableColumn,
} from "@/app/_components/GenericTable/GenericTable";
import { SectionWrapper } from "@/app/_components/SectionWrapper/SectionWrapper";
import { Device } from "@/app/_lib/_react-query-hooks/device/devices.types";
import { useDevicesListRQ } from "@/app/_lib/_react-query-hooks/device/useDevicesRQ";
import axios from "axios";
import { EyeIcon, PencilIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function DeviceListPage() {
  const router = useRouter();
  const { data: devices, refetch: refetchDevices } = useDevicesListRQ();

  console.log("DeviceListPage", devices);

  const handleDelete = async (device: Device) => {
    if (!confirm(`Are you sure you want to delete ${device.name}?`)) return;
    try {
      await axios.delete(`/api/devices/${device._id}`);
      toast.success("Device deleted");
      refetchDevices();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || err.message);
    }
  };

  const columns: TableColumn<Device>[] = [
    {
      header: "Name",
      cell: ({ row }) => {
        return (
          <Link
            href={`/dashboard/devices/${row.original._id}`}
            className="link link-info"
            onClick={(e) => {
              e.preventDefault();
              router.push(`/dashboard/devices/${row.original._id}`);
            }}
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
          online: "badge badge-primary",
          offline: "badge badge-error",
          maintenance: "badge badge-outline",
        };
        return status ? (
          <span className={colors[status]}>{status}</span>
        ) : (
          "Not Available"
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
          <button
            className="btn btn-sm btn-outline"
            onClick={() => router.push(`/devices/${row.original._id}`)}
          >
            View <EyeIcon className="w-3 h-3" />
          </button>
          <button
            className="btn btn-sm btn-primary"
            onClick={() => router.push(`/devices/edit/${row.original._id}`)}
          >
            <PencilIcon className="w-3 h-3" />
          </button>
          <button
            className="btn btn-sm btn-error"
            onClick={() => handleDelete(row.original)}
          >
            <Trash2Icon className="w-3 h-3" />
          </button>
        </div>
      ),
    },
  ];

  return (
    // <SectionWrapper>
    <GenericTable data={(devices as Device[]) ?? []} columns={columns} />
    // </SectionWrapper>
  );
}
