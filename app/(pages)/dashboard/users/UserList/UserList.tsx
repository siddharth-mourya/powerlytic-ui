"use client";

import { GenericTable } from "@/app/_components/GenericTable/GenericTable";
import {
  useListAllUsersRQ,
  User,
} from "@/app/_lib/_react-query-hooks/users/useListAllUsers";
import { ColumnDef } from "@tanstack/react-table";

export function UsersList() {
  const { data: userList } = useListAllUsersRQ();

  const transformedUsers =
    userList?.map((user: User, index) => ({
      id: index + 1,
      name: user.name,
      role: user.role,
      email: user.email,
      phone: user.phone,
      isActive: user.isActive ? "Active" : "Inactive",
      organization: user.organization?.name || "N/A",
      orgId: user.organization?._id || "N/A",
      userId: user._id,
    })) || [];

  const userTableColumns: ColumnDef<(typeof transformedUsers)[0]>[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "role", header: "Role" },
    {
      accessorKey: "isActive",
      header: "Status",
      cell: ({ row }) => (
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
            row.original.isActive === "Active"
              ? "bg-success/10 text-success"
              : "bg-base-300 text-base-content"
          }`}
        >
          {row.original.isActive}
        </span>
      ),
    },
    { accessorKey: "organization", header: "Organization" },
  ];

  const data = transformedUsers;
  const columns = userTableColumns;

  return <GenericTable data={data} columns={columns} />;
}
