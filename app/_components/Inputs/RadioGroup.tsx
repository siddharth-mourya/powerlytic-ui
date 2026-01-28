type Option = { value: string; label: string };

type RadioGroupProps = {
  name: string;
  options: Option[];
  value: string;
  onChange: (val: string) => void;
  description?: string;
};

export function RadioGroup({
  name,
  options,
  value,
  onChange,
  description,
}: RadioGroupProps) {
  return (
    <div className="w-full">
      <div className="space-y-2.5">
        {options.map((opt) => (
          <label key={opt.value} className="label cursor-pointer gap-3 p-0">
            <input
              type="radio"
              name={name}
              className="radio radio-primary transition-all focus:ring-2 focus:ring-primary/30"
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
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
