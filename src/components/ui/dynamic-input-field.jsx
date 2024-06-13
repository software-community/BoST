import React from "react";
import { useFieldArray, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";

const DynamicField = ({ control, name, label, placeholder }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  return (
    <div className="mb-4">
      <label className="mb-2 block text-sm font-medium">{label}</label>
      {fields.map((item, index) => (
        <div key={item.id} className="mb-2 flex items-center">
          <Controller
            name={`${name}[${index}].value`}
            control={control}
            defaultValue={ ""}
            render={({ field }) => (
              <input
                {...field}
                placeholder={placeholder}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500 mr-2"
              />
            )}
          />
          <Button type="button" onClick={() => remove(index)}>
            -
          </Button>
        </div>
      ))}
      <Button type="button" onClick={() => append({ value: "" })}>
        +
      </Button>
    </div>
  );
};


export default DynamicField;
