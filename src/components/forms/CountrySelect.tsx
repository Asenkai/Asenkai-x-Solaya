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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { countries } from "@/data/countries";

interface CountrySelectProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type: "country" | "phoneCode";
}

const CountrySelect: React.FC<CountrySelectProps> = ({
  value,
  onChange,
  placeholder,
  type,
}) => {
  const [open, setOpen] = React.useState(false);

  const displayValue = React.useMemo(() => {
    if (type === "country") {
      return countries.find((country) => country.name === value)?.name || "";
    } else {
      return countries.find((country) => `+${country.phone}` === value)?.phone || "";
    }
  }, [value, type]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? (type === "country" ? displayValue : `+${displayValue}`)
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command>
          <CommandInput placeholder={`Search ${type === "country" ? "country" : "code"}...`} />
          <CommandList>
            <CommandEmpty>No {type === "country" ? "country" : "code"} found.</CommandEmpty>
            <CommandGroup>
              <ScrollArea className="h-72">
                {countries.map((country) => (
                  <CommandItem
                    key={country.code}
                    value={type === "country" ? country.name : `+${country.phone}`}
                    onSelect={(currentValue) => {
                      onChange(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        (type === "country" ? country.name : `+${country.phone}`) === value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {type === "country" ? country.name : `+${country.phone} (${country.name})`}
                  </CommandItem>
                ))}
              </ScrollArea>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CountrySelect;