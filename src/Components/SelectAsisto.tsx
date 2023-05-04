import {
  forwardRef,
  ForwardRefRenderFunction,
  SelectHTMLAttributes,
} from "react";
import AsyncSelect from "react-select/async";

interface ISelect extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  addClassName?: string;
  className?: string;
  colorClassName?: string | null;
  labelClassName?: string;
  isMulti?: boolean;
  loadOptions?: (text: string) => void;
}

const SelectAsisto: ForwardRefRenderFunction<HTMLSelectElement, ISelect> = ({
  disabled,
  className = "appearance-none font-normal h-9 rounded-md flex-1 block w-auto px-3 text-slate-500 text-sm focus:outline-none shadow-md bg-white p-6",
  addClassName = "w-full",
  colorClassName = disabled ? "#4E4B59" : null,
  label,
  labelClassName = "block text-xs text-blac mb-1 font-medium",
  isMulti,
  loadOptions,
}: ISelect) => {
  return (
    <label className={`${addClassName}`}>
      {label && <span className={`${labelClassName}`}>{label}</span>}
      <div
        className={`flex flex-row items-center ${className} ${colorClassName}`}
      >
        <AsyncSelect
          isDisabled={disabled}
          isMulti={isMulti}
          className="flex-1 bg-transparent appearance-none outline-none opacity-100"
          loadOptions={loadOptions}
        />
      </div>
    </label>
  );
};

export const SelectUser = forwardRef(SelectAsisto);
