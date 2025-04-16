"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Authors from "./comboBoxDatas/authors";
import Branches from "./comboBoxDatas/branches";
import Cities from "./comboBoxDatas/cities";
import Genres from "./comboBoxDatas/genres";
import Publishers from "./comboBoxDatas/publishers";
import { SearchState } from "./type/searchStateProps";

const SearchBox = () => {
  const urlParam = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [searchParams, setSearchParams] = useState<SearchState>({
    title: urlParam.get("title") || "",
    genres: urlParam.get("genres") || "",
    authors: urlParam.get("authors") || "",
    publishers: urlParam.get("publishers") || "",
    cities: urlParam.get("cities") || "",
    branches: urlParam.get("branches") || "",
  });

  const handleSearch = () => {
    const params = new URLSearchParams();

    // Set the parameters if it exists
    if (searchParams.title) params.set("title", searchParams.title);
    if (searchParams.genres) params.set("genres", searchParams.genres);
    if (searchParams.authors) params.set("authors", searchParams.authors);
    if (searchParams.publishers)
      params.set("publishers", searchParams.publishers);
    if (searchParams.cities) params.set("cities", searchParams.cities);
    if (searchParams.branches) params.set("branches", searchParams.branches);

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-2">
      <Input
        value={searchParams.title}
        onChange={(e) =>
          setSearchParams({ ...searchParams, title: e.target.value })
        }
        placeholder="Search by title..."
      />

      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        <Genres searchParams={searchParams} setSearchParams={setSearchParams} />
        <Authors
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
        <Publishers
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
        <Cities searchParams={searchParams} setSearchParams={setSearchParams} />
        <Branches
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>
    </div>
  );
};

export default SearchBox;
