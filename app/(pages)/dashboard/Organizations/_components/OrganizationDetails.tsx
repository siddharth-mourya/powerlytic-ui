"use client";

import Button from "@/app/_components/Button/Button";
import { GenericTable } from "@/app/_components/GenericTable/GenericTable";
import { useOrganizationByIdRQ } from "@/app/_lib/_react-query-hooks/organizations/useOrganizationByIdRQ";
import {
  Box,
  Hash,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Users,
  CheckCircle,
  Clock,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";

export function OrganizationDetails() {
  const { orgId } = useParams<{ orgId: string }>();
  const router = useRouter();

  const { data, isLoading, error } = useOrganizationByIdRQ(orgId);

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (error)
    return <div className="p-6 text-red-500">Error loading organization</div>;

  const { organization, users, devices } = data || {};

  // ---- Table column defs ----
  const userColumns: ColumnDef<any>[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "email", header: "Email" },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => (
        <span
          className={`badge ${
            row.original.role === "OrgAdmin" ? "badge-primary" : "badge-ghost"
          }`}
        >
          {row.original.role}
        </span>
      ),
    },
    { accessorKey: "phone", header: "Phone" },
    {
      accessorKey: "isActive",
      header: "Status",
      cell: ({ row }) => (
        <span
          className={`badge ${
            row.original.isActive ? "badge-success" : "badge-error"
          }`}
        >
          {row.original.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
  ];

  const deviceColumns: ColumnDef<any>[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "imei", header: "IMEI" },
    {
      accessorKey: "isActive",
      header: "Status",
      cell: () => <span className="badge badge-success">Active</span>,
    },
  ];

  return (
    <div className="mx-auto space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{organization?.name}</h1>
        <Button
          variant="outline"
          leftIcon={<Pencil />}
          onClick={() => router.push(`/organizations/${orgId}/edit`)}
        >
          Edit Organization
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-base-100 shadow p-4 flex flex-col items-center">
          <Users className="w-6 h-6 text-primary mb-2" />
          <p className="text-sm text-gray-500">Total Users</p>
          <p className="text-xl font-semibold">{users?.length || 0}</p>
        </div>
        <div className="card bg-base-100 shadow p-4 flex flex-col items-center">
          <Box className="w-6 h-6 text-primary mb-2" />
          <p className="text-sm text-gray-500">Devices</p>
          <p className="text-xl font-semibold">{devices?.length || 0}</p>
        </div>
        <div className="card bg-base-100 shadow p-4 flex flex-col items-center">
          {organization?.isActive ? (
            <CheckCircle className="w-6 h-6 text-green-500 mb-2" />
          ) : (
            <Clock className="w-6 h-6 text-red-500 mb-2" />
          )}
          <p className="text-sm text-gray-500">Status</p>
          <span
            className={`badge ${
              organization?.isActive ? "badge-success" : "badge-error"
            }`}
          >
            {organization?.isActive ? "Active" : "Inactive"}
          </span>
        </div>
      </div>

      {/* Organization Info */}
      <div className="card bg-base-100 shadow p-6 space-y-4">
        <h2 className="text-lg font-semibold">Organization Info</h2>
        <div className="grid md:grid-cols-2 gap-4 text-gray-700">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" /> {organization?.orgEmail}
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" /> {organization?.orgPhone}
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" /> {organization?.address}
          </div>
          <div className="flex items-center gap-2">
            <Hash className="w-4 h-4" /> CIN: {organization?.cin}
          </div>
        </div>
        <div className="text-sm text-gray-500">
          Created:{" "}
          {organization &&
            new Date(organization.createdAt).toLocaleDateString()}
        </div>
      </div>

      {/* Users */}
      <div className="card bg-base-100 shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Users className="w-5 h-5" /> Users
          </h2>
          <Button
            variant="primary"
            onClick={() => router.push(`/organizations/${orgId}/add-user`)}
          >
            Add User
          </Button>
        </div>
        <GenericTable columns={userColumns} data={users || []} />
      </div>

      {/* Devices */}
      <div className="card bg-base-100 shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Box className="w-5 h-5" /> Devices
          </h2>
          <Button
            variant="primary"
            onClick={() => router.push(`/organizations/${orgId}/add-device`)}
          >
            Add Device
          </Button>
        </div>
        <GenericTable columns={deviceColumns} data={devices || []} />
      </div>
    </div>
  );
}
