type SwitchProps = {
  checked: boolean;
  onChange: (val: boolean) => void;
  label?: string;
  description?: string;
};

export function Switch({ checked, onChange, label, description }: SwitchProps) {
  return (
    <div className="flex items-start gap-3">
      <label className="label cursor-pointer gap-2 p-0">
        <input
          type="checkbox"
          className="toggle toggle-primary transition-all focus:ring-2 focus:ring-primary/30"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        {label && <span className="label-text font-medium">{label}</span>}
      </label>
      {description && (
        <p className="text-xs text-base-content/60 mt-0.5">{description}</p>
      )}
    </div>
  );
}
