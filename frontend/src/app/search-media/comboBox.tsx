"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface ComboBoxValue {
  value: string;
  label: string;
}

interface ComboBoxProps {
  comboBoxValues: ComboBoxValue[];
  placeholder: string;
  emptyText: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export function ComboBox({
  comboBoxValues,
  placeholder,
  emptyText,
  value,
  setValue,
}: ComboBoxProps): React.ReactElement {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? comboBoxValues.find(
                (comboBoxValue) => comboBoxValue.value === value,
              )?.label
            : placeholder}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {comboBoxValues.map((comboBoxValue) => (
                <CommandItem
                  key={comboBoxValue.value}
                  value={comboBoxValue.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {comboBoxValue.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === comboBoxValue.value
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
