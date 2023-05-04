/* eslint-disable react/function-component-definition */
import React, {
  ForwardedRef,
  forwardRef,
  ForwardRefRenderFunction,
  HTMLAttributes,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  useRef,
  useState,
} from "react";
import { FieldError } from "react-hook-form";
import { HiEyeOff, HiEye } from "react-icons/hi";

// const optionsType = [
//   "password",
//   "text",
//   "button",
//   "submit",
//   "checkbox",
//   "color",
//   "date",
//   "datetime-local",
//   "e-mail",
//   "file",
//   "hidden",
//   "radio",
//   "range",
//   "month",
//   "number",
//   "reset",
//   "search",
//   "tel",
//   "time",
//   "url",
//   "week",
// ];

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelClassName?: string;
  addLabelClassName?: string;
  className?: string;
  error?: FieldError;
  colorClassName?: string;
  enableView?: boolean;
  mask?: "cep" | "cnpj" | "cpf" | "phone" | "cellPhone";
}

// Analisar mais opções de autocomplete
// https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete

const InputBase: ForwardRefRenderFunction<HTMLInputElement, IInputProps> = (
  {
    error = null,
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
    mask,
    autoComplete = "off",
    enableView = false,
    ...rest
  },
  ref
) => {
  const [viewPassword, setViewPassword] =
    useState<HTMLInputTypeAttribute>(type);

  if (hidden) return null;
  return (
    <label className={`w-full max-h-fit ${addLabelClassName}`}>
      {label && <span className={labelClassName}>{label}</span>}
      <input
        className={`${className} ${colorClassName} pt-2 md:pt-3 `}
        {...rest}
        ref={ref}
        autoComplete={autoComplete}
        disabled={disabled}
        type={viewPassword}
        onFocus={(e) => {
          if (e.target.value) {
            if (type === "number") {
              const value = Number(e.target.value);
              if (value === 0) {
                e.target.value = "";
              }
            }

            if (mask) {
              e.target.value = e.target.value
                .replace(/\D/g, "")
                .substring(0, Number(maxLength || e.target.value.length));
            }
          }

          if (onFocus) {
            return onFocus(e);
          }
        }}
        onBlur={(e) => {
          if (!e.target.value) {
            if (type === "number") {
              const value = Number(e.target.value);
              if (value === 0) {
                e.target.value = "0";
              }
            }
          } else if (mask === "cep") {
            e.target.value = e.target.value.replace(
              /^(\d{5})(\d{3})+?$/,
              "$1-$2"
            );
          } else if (mask === "cnpj") {
            e.target.value = e.target.value.replace(
              /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})+?$/,
              "$1.$2.$3/$4-$5"
            );
          } else if (mask === "cpf") {
            e.target.value = e.target.value.replace(
              /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
              "$1.$2.$3-$4"
            );
          } else if (mask === "phone") {
            e.target.value = e.target.value.replace(
              /^(\d{2})(\d{4})(\d{4})+?$/,
              "($1) $2-$3"
            );
          } else if (mask === "cellPhone") {
            e.target.value = e.target.value.replace(
              /^(\d{2})(\d{5})(\d{4})+?$/,
              "($1) $2-$3"
            );
          }

          if (onBlur) {
            return onBlur(e);
          }
        }}
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

export const Input = forwardRef(InputBase);
