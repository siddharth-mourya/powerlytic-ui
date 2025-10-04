"use client";

import Button from "@/app/_components/Button/Button";
import { GenericTable } from "@/app/_components/GenericTable/GenericTable";
import { Organization } from "@/app/_lib/_react-query-hooks/organizations/organizations.types";
import { useOrganizationsRQ } from "@/app/_lib/_react-query-hooks/organizations/useOrganizationsRQ";
import { useRouter } from "next/navigation";

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
    { header: "Email", accessorKey: "orgEmail" },
    { header: "Phone", accessorKey: "orgPhone" },
    { header: "Status", accessorKey: "isActive" },
    {
      header: "Created",
      accessorKey: "createdAt",
      cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
    },
    {
      header: "Actions",
      cell: ({ row }) => (
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
