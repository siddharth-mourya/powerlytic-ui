import { useAuthContext } from "@/app/_lib/context/AuthContext";

const DataCell = ({
  label,
  value,
}: {
  label: string;
  value: string | number | null;
}) => (
  <>
    <span className="border p-4 text-sm text-gray-500">{label}</span>
    <span className="border p-4 font-medium text-gray-800">
      {value ?? "N/A"}
    </span>
  </>
);

export const CurrentUserProfile = () => {
  const { user } = useAuthContext();
  return (
    <div>
      <h2 className="text-xl">Current User Profile</h2>
      <div className="grid grid-cols-2 mt-4">
        <DataCell label="Name" value={user?.name || "N/A"} />
        <DataCell label="Email" value={user?.email || "N/A"} />
        <DataCell label="Role" value={user?.role || "N/A"} />
        <DataCell label="Organization" value={user?.orgId || "N/A"} />
        <DataCell label="User ID" value={user?._id || "N/A"} />
      </div>
    </div>
  );
};
