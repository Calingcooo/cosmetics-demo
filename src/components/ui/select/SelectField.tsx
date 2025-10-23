import clsx from "clsx";

interface SelectFieldProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string; // Optional placeholder like "Select Region"
  options: { label: string; value: string }[];
  error?: string | null;
}

const SelectField: React.FC<SelectFieldProps> = ({
  id,
  name,
  value,
  onChange,
  placeholder,
  options,
  error,
}) => {
  const formatLabel = (id: string) => {
    return id
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="space-y-1">
      <label
        htmlFor={id}
        className="text-sm capitalize font-medium leading-none"
      >
        {formatLabel(id)}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={clsx(
          "bg-[theme(--muted)]/50 flex h-10 w-full rounded-md border px-3 py-2 text-base ring-offset-[theme(--background)] placeholder:text-[theme(--muted-foreground)]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 md:text-sm",
          {
            "border-[theme(--destructive)] focus-visible:ring-[theme(--destructive)]": error,
            "border-input focus-visible:ring-[theme(--ring)]": !error,
          }
        )}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt, i) => (
          <option key={i} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
