interface ReadOnlyFieldProps {
  label: string;
  value: React.ReactNode;
}

export function ReadOnlyField({ label, value }: ReadOnlyFieldProps) {
  return (
    <div>
      <label className="text-xs text-gray-500">{label}</label>
      <div className="mt-1 px-3 py-2 bg-gray-100 rounded text-sm text-gray-700">
        {value}
      </div>
    </div>
  );
}
