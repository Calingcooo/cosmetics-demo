interface InputFieldProps {
  id: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  autoComplete,
}) => {
  return (
    <div className="space-y-1">
      <label
        htmlFor={id}
        className="text-sm capitalize font-medium leading-none"
      >
        {id.replace("_", " ")}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="bg-[theme(--muted)]/50 flex h-10 w-full rounded-md border border-input px-3 py-2 text-base ring-offset-[theme(--background)] placeholder:text-[theme(--muted-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[theme(--ring)] focus-visible:ring-offset-2 md:text-sm"
      />
    </div>
  );
};
export default InputField;
