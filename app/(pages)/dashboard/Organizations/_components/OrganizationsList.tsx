"use client";

import Button from "@/app/_components/Button/Button";
import { GenericTable } from "@/app/_components/GenericTable/GenericTable";
import { useOrganizationsRQ } from "@/app/_lib/_react-query-hooks/organizations/useOrganizationsRQ";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Organization = {
  _id: string;
  name: string;
  description?: string;
  createdAt: string;
};

export function OrganizationList() {
  const router = useRouter();
  const { data: organizations } = useOrganizationsRQ();

  const transformedOrganizations =
    organizations?.map((org) => ({
      _id: org._id,
      name: org.name,
      email: org.orgEmail,
      phone: org.orgPhone,
      createdAt: org.createdAt,
      isActive: org.isActive,
    })) || [];

  const columns = [
    {
      header: "Name",
      cell: ({ row }: any) => {
        return (
          <a
            href={`/dashboard/organizations/${row.original._id}`}
            className="link link-info"
            onClick={() =>
              router.push(`/dashboard/organizations/${row.original._id}`)
            }
          >
            {row.original.name}
          </a>
        );
      },
    },
    { header: "Email", accessorKey: "email" },
    { header: "Phone", accessorKey: "phone" },
    { header: "Status", accessorKey: "isActive" },
    {
      header: "Created",
      accessorKey: "createdAt",
      cell: ({ row }: any) =>
        new Date(row.original.createdAt).toLocaleDateString(),
    },
    {
      header: "Actions",
      cell: ({ row }: any) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            router.push(`/dashboard/organizations/${row.original._id}`)
          }
        >
          Edit
        </Button>
      ),
    },
  ];

  return (
    <div className="mt-5 space-y-2">
      <Button onClick={() => router.push("/dashboard/organizations/new")}>
        + New Organization
      </Button>
      <GenericTable data={transformedOrganizations} columns={columns} />
    </div>
  );
}
