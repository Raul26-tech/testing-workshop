import { ReactNode } from "react";
import ReactAsyncSelect from "react-select/async";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { api } from "../../Services/api";

interface IToFields<R> {
  value: keyof R;
  label: keyof R;
}

interface IAsyncSelectProps<R, T extends FieldValues> {
  url: string;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  toFields: IToFields<R>;
  control: Control<T, any> | undefined;
}

export function AsyncSelect<R, T extends FieldValues>({
  url,
  name,
  label = "",
  placeholder = "",
  control,
  toFields,
  disabled = false,
}: IAsyncSelectProps<R, T>) {
  const mapResponseToValuesAndLabels = (data: R) => ({
    value: data[toFields.value],
    label: data[toFields.label],
  });

  async function callApi(value: string) {
    try {
      const response = await api.get(url);
      return response.data
        .map(mapResponseToValuesAndLabels)
        .filter((i: { value: string; label: string }) =>
          i.label.toLowerCase().includes(value.toLowerCase())
        );
    } catch (error) {
      console.log(error);
    }
  }

  function changeToOption(data: R) {
    console.log(data);
    if (data && !!data[toFields.value]) {
      return {
        value: data[toFields.value],
        label: data[toFields.label],
      };
    }

    return data;
  }

  return (
    <label className="w-full h-20">
      {label && (
        <span
          className={`
                    block
                    text-xs
                    text-[#4A7C59]
                    mb-1
                    font-medium

                `}
        >
          {label}
        </span>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange, onBlur } }) => {
          return (
            <ReactAsyncSelect
              cacheOptions
              isClearable
              defaultOptions
              placeholder={placeholder}
              loadOptions={callApi}
              value={changeToOption(value)}
              onChange={onChange}
              onBlur={onBlur}
              isDisabled={disabled}
            />
          );
        }}
      />
    </label>
  );
}
