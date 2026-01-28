type Option = { value: string; label: string };

type CheckboxGroupProps = {
  options: Option[];
  value: string[];
  onChange: (newValues: string[]) => void;
  description?: string;
};

export function CheckboxGroup({
  options,
  value,
  onChange,
  description,
}: CheckboxGroupProps) {
  const toggle = (val: string) => {
    if (value.includes(val)) {
      onChange(value.filter((v) => v !== val));
    } else {
      onChange([...value, val]);
    }
  };

  return (
    <div className="w-full">
      <div className="space-y-2.5">
        {options.map((opt) => (
          <label key={opt.value} className="label cursor-pointer gap-3 p-0">
            <input
              type="checkbox"
              className="checkbox checkbox-primary transition-all focus:ring-2 focus:ring-primary/30"
              checked={value.includes(opt.value)}
              onChange={() => toggle(opt.value)}
            />
            <span className="label-text font-medium">{opt.label}</span>
          </label>
        ))}
      </div>
      {description && (
        <p className="text-xs text-base-content/60 mt-2">{description}</p>
      )}
    </div>
  );
}
