"use client";

import { GenericTable } from "@/app/_components/GenericTable/GenericTable";
import { ColumnDef } from "@tanstack/react-table";

type User = {
  id: number;
  name: string;
  role: string;
  status: string;
};

const data: User[] = [
  { id: 1, name: "Alice", role: "CompanyAdmin", status: "Active" },
  { id: 2, name: "Bob", role: "OrgAdmin", status: "Inactive" },
  { id: 3, name: "Charlie", role: "OrgUser", status: "Active" },
  { id: 4, name: "David", role: "OrgUser", status: "Pending" },
  { id: 5, name: "Eve", role: "OrgAdmin", status: "Active" },
  { id: 6, name: "Frank", role: "CompanyAdmin", status: "Inactive" },
  { id: 7, name: "Grace", role: "OrgUser", status: "Active" },
  { id: 8, name: "Heidi", role: "OrgAdmin", status: "Pending" },
  { id: 9, name: "Ivan", role: "OrgUser", status: "Active" },
  { id: 10, name: "Judy", role: "CompanyAdmin", status: "Active" },
  { id: 11, name: "Mallory", role: "OrgUser", status: "Inactive" },
  { id: 12, name: "Niaj", role: "OrgAdmin", status: "Active" },
  { id: 13, name: "Olivia", role: "OrgUser", status: "Pending" },
  { id: 14, name: "Peggy", role: "CompanyAdmin", status: "Active" },
  { id: 15, name: "Sybil", role: "OrgUser", status: "Inactive" },
  { id: 16, name: "Trent", role: "OrgAdmin", status: "Active" },
  { id: 17, name: "Victor", role: "OrgUser", status: "Active" },
  { id: 18, name: "Wendy", role: "OrgAdmin", status: "Pending" },
  { id: 19, name: "Xavier", role: "OrgUser", status: "Active" },
  { id: 20, name: "Yvonne", role: "CompanyAdmin", status: "Active" },
];

const columns: ColumnDef<User>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "role", header: "Role" },
  { accessorKey: "status", header: "Status" },
];

export function UsersList() {
  return <GenericTable data={data} columns={columns} />;
}
