"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { TransferFormSchema } from "@/app/transfer/type/form.schema";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { onSubmit } from "@/app/transfer/functions/on.submit";
import { cn } from "@/lib/utils";
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
import { Branch } from "@/api/inventory/branch";
import { TransferProps } from "@/app/transfer/type/props";

export const TransferMedia = ({ branches, medias }: TransferProps) => {
  const form = useForm<z.infer<typeof TransferFormSchema>>({
    resolver: zodResolver(TransferFormSchema),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Start of 1st branch select */}
        <FormField
          control={form.control}
          name="currentBranchId"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Select branch</FormLabel>

              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value
                        ? branches.find((branch) => branch.id === field.value)
                            ?.name
                        : "Select branch"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>

                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search branch..." />
                    <CommandList>
                      <CommandEmpty>No branch found.</CommandEmpty>
                      <CommandGroup>
                        {branches.map((branch: Branch) => (
                          <CommandItem
                            value={branch.name}
                            key={branch.id}
                            onSelect={() => {
                              form.setValue("currentBranchId", branch.id);
                            }}
                          >
                            {branch.name}
                            <Check
                              className={cn(
                                "ml-auto",
                                branch.id === field.value
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
              <FormMessage />
            </FormItem>
          )}
        />
        {/* End of 1st branch select */}

        {/* Start of media select */}
        <FormField
          control={form.control}
          name="mediaId"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Select media</FormLabel>

              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value
                        ? medias.find((media) => media.id === field.value)
                            ?.title
                        : "Select media"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>

                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search media..." />
                    <CommandList>
                      <CommandEmpty>No media found.</CommandEmpty>
                      <CommandGroup>
                        {medias.map((media) => (
                          <CommandItem
                            value={media.title}
                            key={media.id}
                            onSelect={() => {
                              form.setValue("mediaId", media.id);
                            }}
                          >
                            {media.title}
                            <Check
                              className={cn(
                                "ml-auto",
                                media.id === field.value
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
              <FormMessage />
            </FormItem>
          )}
        />
        {/* End of media select */}

        {/* Start of 2nd branch select */}
        <FormField
          control={form.control}
          name="selectedBranchId"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Select branch</FormLabel>

              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value
                        ? branches.find((branch) => branch.id === field.value)
                            ?.name
                        : "Select branch"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>

                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search branch..." />
                    <CommandList>
                      <CommandEmpty>No branch found.</CommandEmpty>
                      <CommandGroup>
                        {branches.map((branch) => (
                          <CommandItem
                            value={branch.name}
                            key={branch.id}
                            onSelect={() => {
                              form.setValue("selectedBranchId", branch.id);
                            }}
                          >
                            {branch.name}
                            <Check
                              className={cn(
                                "ml-auto",
                                branch.id === field.value
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
              <FormMessage />
            </FormItem>
          )}
        />
        {/* End of 2nd branch select */}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
