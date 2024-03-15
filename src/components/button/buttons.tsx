import React, { ReactNode, CSSProperties } from "react";

interface BaseProps {
  title?: string;
  style?: CSSProperties;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  onClick?: (e?: any) => void;
}

interface ButtonProps extends BaseProps {
  children: ReactNode;
}

interface SpecificButtonProps extends BaseProps {
  title?: string;
}

const Button: React.FC<ButtonProps> & {
  Base: React.FC<BaseProps>;
  Primary: React.FC<SpecificButtonProps>;
  Secondary: React.FC<SpecificButtonProps>;
  Green: React.FC<SpecificButtonProps>;
  Red: React.FC<SpecificButtonProps>;
} = ({ children }) => {
  return <>{children}</>;
};

Button.Base = ({
  title,
  style,
  className,
  disabled,
  loading,
  onClick = () => {},
}) => {
  return (
    <button
      type="button"
      style={style}
      onClick={() => onClick()}
      disabled={disabled || loading}
      className={
        "p-2 rounded-md text-center text-white whitespace-nowrap " + className
      }
    >
      {title ?? "Title"}
      {/* {loading && <RiLoader5Fill size={24} className="animate-spin ml-4" />} */}
    </button>
  );
};

Button.Primary = ({ title, style, className, disabled, loading, onClick }) => {
  return (
    <button
      type="button"
      style={style}
      onClick={() => (onClick ? onClick() : {})}
      disabled={disabled || loading}
      className={
        "p-2 rounded-md text-center text-white whitespace-nowrap " +
        className +
        (disabled ? " bg-[#FAFAFF]" : " bg-primary")
      }
    >
      {loading ? "Loading..." : title ?? "Title"}
      {/* {loading && <RiLoader5Fill size={24} className="animate-spin ml-4" />} */}
    </button>
  );
};

Button.Secondary = ({
  title,
  style,
  className,
  disabled,
  loading,
  onClick = () => {},
}) => {
  return (
    <button
      type="button"
      style={style}
      onClick={() => onClick()}
      disabled={disabled || loading}
      className={
        "border-primary p-2 rounded-md text-center text-primary whitespace-nowrap " +
        className +
        (disabled ? " bg-[#FAFAFF]" : " bg-white border")
      }
    >
      {title ?? "Title"}
      {/* {loading && <RiLoader5Fill size={24} className="animate-spin ml-4" />} */}
    </button>
  );
};

Button.Green = ({
  title,
  style,
  className,
  loading,
  disabled,
  onClick = () => {},
}) => {
  return (
    <button
      type="button"
      style={style}
      onClick={() => onClick()}
      disabled={disabled || loading}
      className={
        "bg-green-500 p-2 rounded-md text-center text-white whitespace-nowrap " +
        className
      }
    >
      {title ?? "Title"}
      {/* {loading && <RiLoader5Fill size={24} className="animate-spin ml-4" />} */}
    </button>
  );
};

Button.Red = ({
  title,
  style,
  className,
  loading,
  disabled,
  onClick = () => {},
}) => {
  return (
    <button
      type="button"
      style={style}
      onClick={() => onClick()}
      disabled={disabled || loading}
      className={
        "bg-red-500 p-2 rounded-md text-center text-white whitespace-nowrap " +
        className
      }
    >
      {title ?? "Title"}
      {/* {loading && <RiLoader5Fill size={24} className="animate-spin ml-4" />} */}
    </button>
  );
};

export default Button;
