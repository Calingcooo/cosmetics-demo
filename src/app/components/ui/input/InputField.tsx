import clsx from "clsx";

interface InputFieldProps {
  id: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: string;
  error?: string | null;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  autoComplete,
  error,
}) => {
  const formatLabel = (id: string) => {
    return id
      .split("_") // split by underscore
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // capitalize
      .join(" "); // join back with spaces
  };

  return (
    <div className="space-y-1">
      <label
        htmlFor={id}
        className="text-sm capitalize font-medium leading-none"
      >
        {formatLabel(id)}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={clsx(
          "bg-[theme(--muted)]/50 flex h-10 w-full rounded-md border px-3 py-2 text-base ring-offset-[theme(--background)] placeholder:text-[theme(--muted-foreground)]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 md:text-sm",
          {
            "border-[theme(--destructive)] focus-visible:ring-[theme(--destructive)]":
              error,
            "border-input focus-visible:ring-[theme(--ring)]": !error,
          }
        )}
      />
    </div>
  );
};
export default InputField;
