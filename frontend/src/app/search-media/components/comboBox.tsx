"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

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
import { cn } from "@/lib/utils";
import { SearchOptions, SearchStateProps } from "./type/searchStateProps";

interface Data {
  label: string;
  value: string;
}

interface Props {
  data: Data[];
  context: SearchStateProps;
  type: SearchOptions;
  placeholder: string;
  notFound: string;
}

function Combobox({
  data,
  context: { searchParams, setSearchParams },
  type,
  notFound,
  placeholder,
}: Props) {
  const [open, setOpen] = useState(false);

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [buttonWidth, setButtonWidth] = useState(0);
  useEffect(() => {
    if (buttonRef.current) setButtonWidth(buttonRef.current.offsetWidth);
  }, [open]);

  const handleSelect = (currentValue: string) => {
    setSearchParams((prev) => ({
      ...prev,
      [type]: searchParams[type] === currentValue ? "" : currentValue,
    }));
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={buttonRef}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="flex-1 justify-between"
        >
          {(searchParams[type] &&
            data.find((item) => item.value === searchParams[type])?.label) ||
            placeholder}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent style={{ width: `${buttonWidth}px` }} className="p-0">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandList>
            <CommandEmpty>{notFound}</CommandEmpty>
            <CommandGroup>
              {data.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={() => handleSelect(item.value)}
                >
                  {item.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      searchParams[type] === item.value
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

export default Combobox;
