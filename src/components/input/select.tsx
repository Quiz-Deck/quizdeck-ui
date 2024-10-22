import React, { ReactNode } from "react";

type SelectProps = {
  name?: string;
  value?: string;
  className?: string;
  passwordInput?: boolean;
  prefixLabel?: any;
  suffixLabel?: ReactNode;
  setValue?: (e?: any) => void;
  required?: boolean;
  label: string;
  labelIcon?: string;
  errorMessage?: any;
  icon?: ReactNode;
  iconClick?: () => void;
  prefix?: string;
  onClick?: (e: any) => void;
  onChange?: (e: any) => void;
  children: ReactNode;
};

export const SelectInput = ({
  name,
  value,
  // onClick,
  onChange,
  // setValue,
  label,
  labelIcon,
  // iconClick,
  // passwordInput,
  required,
  errorMessage,
  // icon,
  className,
  children,
  ...rest
}: SelectProps) => {
  return (
    <div>
      {label && (
        <div className="w-full flex items-center">
          <label className="block text-sm font-medium text-[#151515]">
            {label}
          </label>
          {labelIcon && <img src={labelIcon} alt="" className="ml-2" />}
          {required && <span className="text-text-red ml-[3px]"> * </span>}
        </div>
      )}

      <main
        className={`w-full mb-3 flex items-center justify-between gap-[0.5rem]`}
      >
        <select
          {...rest}
          name={name}
          value={value}
          onChange={onChange}
          autoComplete="off"
          className={
            "mt-2 block pl-3 pr-10 w-full text-base focus:ring focus:ring-primary focus:border-primary focus:outline-none sm:text-sm h-[50px] px-4 py-2 mb-4 border border-gray-300 rounded-[20px] " +
            className
          }
        >
          {children}
        </select>
      </main>
      {errorMessage && (
        <div className="w-full ">
          <span className="text-text-red text-[12px] ">{errorMessage}</span>
        </div>
      )}
    </div>
  );
};
