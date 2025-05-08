import React from "react";

const TextInput = ({
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
        className="block text-lg font-medium text-[#ffffff]"
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
            "mt-2 block pr-10 w-full focus:outline-none text-[#FFFFFF80] sm:text-sm h-[50px] py-2 mb-4 border-b border-[#D9D9D9] bg-transparent " +
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

export default TextInput;
