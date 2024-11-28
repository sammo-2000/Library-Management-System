"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const SearchBranches = ({ branchName }: { branchName?: string }) => {
  const router = useRouter();

  const [search, setSearch] = useState(branchName || "");

  const insertIntoURL = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.replace(`/transfer-media?branchName=${search}`);
  };

  return (
    <form className={"flex gap-2"} onSubmit={insertIntoURL}>
      <Input
        placeholder={"Search by branch name"}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button>
        <Search />
      </Button>
    </form>
  );
};
