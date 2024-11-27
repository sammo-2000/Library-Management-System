"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const SearchBranches = ({ branchName }: { branchName?: string }) => {
  const router = useRouter();

  const [search, setSearch] = useState(branchName || "");

  const insertIntoURL = async () => {
    router.replace(`/transfer-media?branchName=${search}`);
  };

  return (
    <div className={"flex gap-2"}>
      <Input
        placeholder={"Search by branch name"}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button onClick={insertIntoURL}>
        <Search />
      </Button>
    </div>
  );
};
