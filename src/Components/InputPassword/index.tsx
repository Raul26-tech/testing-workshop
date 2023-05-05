import React, {
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  forwardRef,
  useState,
} from "react";
import { FieldError } from "react-hook-form";
import { HiEyeOff, HiEye } from "react-icons/hi";

interface IInputPasswordProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelClassName?: string;
  addLabelClassName?: string;
  className?: string;
  error?: FieldError;
  colorClassName?: string;
  enableView?: boolean;
}

export const InputPassword: ForwardRefRenderFunction<
  HTMLInputElement,
  IInputPasswordProps
> = (
  {
    error,
    label,
    labelClassName = `
            block
            text-xs
            text-gmov-input-label
            mb-1
            font-medium
        `,
    addLabelClassName = "",
    className = `
            font-normal
            h-9
            border
            border-solid
            rounded-md
            border-gmov-input-border
            flex-1
            block
            w-24 
            min-w-full 
            p-3
            text-gmov-input-text
            text-sm
            appearance-none
            focus:outline-none
            shadow-md
            focus:shadow-lg
        `,
    disabled,
    hidden,
    type = "text",
    onBlur,
    onFocus,
    colorClassName = disabled ? "bg-gmov-input" : "",
    maxLength,
    autoComplete = "off",
    enableView = false,
    ...rest
  },
  ref
) => {
  const [viewPassword, setViewPassword] = useState(type);

  if (hidden) return null;
  return (
    <label className={`w-full max-h-fit ${addLabelClassName}`}>
      {label && <span className={labelClassName}>{label}</span>}
      <input
        className={`${className} ${colorClassName} pt-2 md:pt-3 `}
        {...rest}
        autoComplete={autoComplete}
        disabled={disabled}
        type={viewPassword}
      />
      {enableView && (
        <div className="absolute w-9 h-9 p-1 top-[8.5rem] left-[27rem] flex ">
          <div className="w-full relative flex justify-center items-center">
            {viewPassword === "password" ? (
              <HiEyeOff
                onClick={() => {
                  setViewPassword("text");
                }}
              />
            ) : (
              <HiEye
                onClick={() => {
                  setViewPassword("password");
                }}
              />
            )}
          </div>
        </div>
      )}
      {error?.message ? (
        <span className="text-red-500 text-xs">{error.message}</span>
      ) : null}
    </label>
  );
};

export const Input = forwardRef(InputPassword);
