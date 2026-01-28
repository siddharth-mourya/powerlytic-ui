"use client";

import Button from "@/app/_components/Button/Button";
import { GenericTable } from "@/app/_components/GenericTable/GenericTable";
import { Organization } from "@/app/_lib/_react-query-hooks/organizations/organizations.types";
import { useOrganizationsRQ } from "@/app/_lib/_react-query-hooks/organizations/useOrganizationsRQ";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Edit } from "lucide-react";

type TableOrganization = Pick<
  Organization,
  "_id" | "name" | "orgEmail" | "orgPhone" | "isActive" | "createdAt"
>;

type TableColumn = {
  header: string;
  accessorKey?: keyof TableOrganization;
  cell?: (props: {
    row: { original: TableOrganization };
  }) => React.ReactElement | string;
};

export function OrganizationList() {
  const router = useRouter();
  const { data: organizations } = useOrganizationsRQ();

  const transformedOrganizations =
    organizations?.map((org) => ({
      _id: org._id,
      name: org.name,
      orgEmail: org.orgEmail,
      orgPhone: org.orgPhone,
      createdAt: org.createdAt,
      isActive: org.isActive,
    })) || [];

  const columns: TableColumn[] = [
    {
      header: "Name",
      cell: ({ row }) => {
        return (
          <Link
            href={`/dashboard/organizations/${row.original._id}`}
            className="font-semibold text-primary hover:underline"
            onClick={(e) => {
              e.preventDefault();
              router.push(`/dashboard/organizations/${row.original._id}`);
            }}
          >
            {row.original.name}
          </Link>
        );
      },
    },
    { header: "Email", accessorKey: "orgEmail" },
    { header: "Phone", accessorKey: "orgPhone" },
    {
      header: "Status",
      accessorKey: "isActive",
      cell: ({ row }) => (
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
            row.original.isActive
              ? "bg-success/10 text-success"
              : "bg-base-300 text-base-content"
          }`}
        >
          {row.original.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      header: "Created",
      accessorKey: "createdAt",
      cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <Button
          variant="ghost"
          size="sm"
          leftIcon={<Edit className="h-4 w-4" />}
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
    <div className="space-y-5 mt-6">
      <Button
        leftIcon={<Plus className="h-4 w-4" />}
        onClick={() => router.push("/dashboard/organizations/new")}
      >
        New Organization
      </Button>
      <GenericTable data={transformedOrganizations} columns={columns} />
    </div>
  );
}
