import React from "react";
import { EyeIcon } from "@heroicons/react/24/outline";

const Input = ({ children }: any) => {
  return (
    <div className="Input" data-test="inputComponent">
      {children}
    </div>
  );
};

Input.Label = ({
  title,
  className,
  placeholder,
  type,
  name,
  readOnly,
  id,
  value,
  defaultValue,
  htmlFor,
  onKeyDown,
  onChange,
  disabled,
  autoComplete,
}: any) => {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-[#151515]"
      >
        {title ?? "Title"}
      </label>
      <div className="mt-2">
        <input
          type={type}
          name={name}
          readOnly={readOnly}
          defaultValue={defaultValue}
          id={id}
          value={value}
          onKeyDown={onKeyDown}
          className={
            "mt-2 block pl-3 pr-10 w-full text-base focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none sm:text-sm h-[40px] px-4 py-2 mb-4 border border-gray-300 " +
            className
          }
          placeholder={placeholder}
          onChange={onChange}
          disabled={disabled}
          autoComplete={autoComplete}
        />
      </div>
    </div>
  );
};

Input.Password = ({
  title,
  className,
  placeholder,
  name,
  id,
  onClick,
  value,
  htmlFor,
  onChange,
  disabled,
}: any) => {
  const toggleFunction = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const x = document.getElementById("password") as HTMLInputElement;

    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }

    e.currentTarget.classList.toggle("fa-eye-slash");
  };

  return (
    <div className="relative">
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-[#151515]"
      >
        {title ?? "Title"}
      </label>
      <div className="mt-2 relative">
        <input
          type={"password"}
          name={name}
          id={"password"}
          value={value}
          autoComplete="off"
          className={
            "mt-2 block pl-3 pr-10 w-full text-base focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none sm:text-sm h-[40px] px-4 py-2 mb-4 border border-gray-300 " +
            className
          }
          placeholder={placeholder}
          onChange={onChange}
          disabled={disabled}
        />

        <EyeIcon
          className="absolute top-3 right-4 h-5 w-5 cursor-pointer"
          aria-hidden="true"
          onClick={(e: any) => toggleFunction(e)}
        />
      </div>
    </div>
  );
};

Input.Number = ({
  title,
  className,
  placeholder,
  type,
  name,
  readOnly,
  id,
  value,
  defaultValue,
  htmlFor,
  onKeyDown,
  onChange,
  disabled,
  autoComplete,
}: any) => {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-[#151515]"
      >
        {title ?? "Title"}
      </label>
      <div className="mt-2">
        <input
          type={"number"}
          name={name}
          readOnly={readOnly}
          defaultValue={defaultValue}
          id={id}
          value={value}
          onKeyDown={onKeyDown}
          className={
            "mt-2 block pl-3 pr-10 w-full text-base focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none sm:text-sm h-[40px] px-4 py-2 mb-4 border border-gray-300 " +
            className
          }
          placeholder={placeholder}
          onChange={onChange}
          disabled={disabled}
          autoComplete={autoComplete}
        />
      </div>
    </div>
  );
};

Input.Textarea = ({
  title,
  className,
  placeholder,
  type,
  name,
  readOnly,
  id,
  value,
  defaultValue,
  htmlFor,
  onKeyDown,
  onChange,
  disabled,
  autoComplete,
}: any) => {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-[#151515]"
      >
        {title ?? "Title"}
      </label>
      <div className="mt-2">
        <textarea
          name={name}
          readOnly={readOnly}
          defaultValue={defaultValue}
          id={id}
          value={value}
          onKeyDown={onKeyDown}
          className={
            "mt-2 block pl-3 pr-10 w-full text-base focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none sm:text-sm h-[40px] px-4 py-2 mb-4 border border-gray-300 " +
            className
          }
          placeholder={placeholder}
          onChange={onChange}
          disabled={disabled}
          autoComplete={autoComplete}
          minLength={5}
        />
      </div>
    </div>
  );
};

export default Input;
