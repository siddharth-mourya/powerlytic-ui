type Option = { value: string; label: string };

type RadioGroupProps = {
  name: string;
  options: Option[];
  value: string;
  onChange: (val: string) => void;
};

export function RadioGroup({
  name,
  options,
  value,
  onChange,
}: RadioGroupProps) {
  return (
    <div className="space-y-2">
      {options.map((opt) => (
        <label key={opt.value} className="label cursor-pointer gap-2">
          <input
            type="radio"
            name={name}
            className="radio radio-primary"
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
          />
          <span className="label-text">{opt.label}</span>
        </label>
      ))}
    </div>
  );
}
