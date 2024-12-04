"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { TransferFormSchema } from "@/app/transfer/type/form.schema";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, MoveLeft, MoveRight } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const TransferMedia = ({ branches, medias }: TransferProps) => {
  const form = useForm<z.infer<typeof TransferFormSchema>>({
    resolver: zodResolver(TransferFormSchema),
    defaultValues: {
      quantity: 0,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Start of 1st branch select */}
        <FormField
          control={form.control}
          name="branchOne"
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
                        "justify-between",
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

                <PopoverContent className="p-0">
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
                              form.setValue("branchOne", branch.id);
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

        {/* Start of quantity select */}
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input placeholder="quantity" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* End of quantity select */}

        {/* Start of transfer select */}
        <FormField
          control={form.control}
          name="transfer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transfer direction</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select transfer direction" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="OneToTwo">
                    <MoveRight />
                  </SelectItem>
                  <SelectItem value="TwoToOne">
                    <MoveLeft />
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* End of transfer select */}

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
                        "justify-between",
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

                <PopoverContent className="p-0">
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
          name="branchTwo"
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
                        "justify-between",
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

                <PopoverContent className="p-0">
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
                              form.setValue("branchTwo", branch.id);
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
