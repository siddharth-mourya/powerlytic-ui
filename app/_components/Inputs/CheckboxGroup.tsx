type Option = { value: string; label: string };

type CheckboxGroupProps = {
  options: Option[];
  value: string[];
  onChange: (newValues: string[]) => void;
};

export function CheckboxGroup({
  options,
  value,
  onChange,
}: CheckboxGroupProps) {
  const toggle = (val: string) => {
    if (value.includes(val)) {
      onChange(value.filter((v) => v !== val));
    } else {
      onChange([...value, val]);
    }
  };

  return (
    <div className="space-y-2">
      {options.map((opt) => (
        <label key={opt.value} className="label cursor-pointer gap-2">
          <input
            type="checkbox"
            className="checkbox"
            checked={value.includes(opt.value)}
            onChange={() => toggle(opt.value)}
          />
          <span className="label-text">{opt.label}</span>
        </label>
      ))}
    </div>
  );
}
