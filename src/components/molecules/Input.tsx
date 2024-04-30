import { useFormContext } from "react-hook-form";

interface IInputProps {
  label: string;
  type: string;
  id: string;
  placeholder: string;
}

function Input({ label, type, id, placeholder }: IInputProps) {
  const { register } = useFormContext();

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          id={id}
          type={type}
          className="w-full rounded-md p-2 shadow-lg ring-1 ring-blue-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
          placeholder={placeholder}
          {...register(id, {
            required: {
              value: true,
              message: "required",
            },
          })}
        />
      </div>
    </div>
  );
}

export default Input;
