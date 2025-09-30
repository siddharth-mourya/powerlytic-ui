type SwitchProps = {
  checked: boolean;
  onChange: (val: boolean) => void;
  label?: string;
};

export function Switch({ checked, onChange, label }: SwitchProps) {
  return (
    <label className="label cursor-pointer gap-2">
      <input
        type="checkbox"
        className="toggle toggle-primary"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      {label && <span className="label-text">{label}</span>}
    </label>
  );
}
