"use client";
import React, { use, useCallback, useEffect } from "react";
import { ComboBox } from "./comboBox";
import type { ComboBoxValue } from "./comboBox";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchFormProps {
  genres: ComboBoxValue[];
  authors: ComboBoxValue[];
  publishers: ComboBoxValue[];
  cities: ComboBoxValue[];
  branches: { id: number; name: string; cityId: number }[];
}

export default function SearchForm({
  genres,
  authors,
  publishers,
  cities,
  branches,
}: SearchFormProps) {
  const searchParams = useSearchParams();
  const [title, setTitle] = React.useState(searchParams.get("title") || "");
  const [genre, setGenre] = React.useState(searchParams.get("genreId") || "");
  const [author, setAuthor] = React.useState(
    searchParams.get("authorId") || "",
  );
  const [publisher, setPublisher] = React.useState(
    searchParams.get("publisherId") || "",
  );
  const [city, setCity] = React.useState(searchParams.get("cityId") || "");
  const [branch, setBranch] = React.useState(
    searchParams.get("branchId") || "",
  );

  const [branchesComboBoxValues, setBranchesComboBoxValues] = React.useState<
    ComboBoxValue[]
  >(
    branches.map((branch) => ({
      value: String(branch.id),
      label: branch.name,
    })),
  );

  useEffect(() => {
    // Filter branches based on selected city
    if (city) {
      const branchesValues = branches
        .filter((branch) => branch.cityId === parseInt(city))
        .map((branch) => ({ value: String(branch.id), label: branch.name }));
      setBranchesComboBoxValues(branchesValues);

      //Set branch to the first branch of the selected city
      if (branchesValues.length > 0) {
        setBranch(branchesValues[0].value);
      } else {
        setBranch("");
      }
    }
  }, [city]);

  useEffect(() => {
    // Set city to the city of the selected branch
    if (branch) {
      const selectedBranch = branches.find((b) => b.id === parseInt(branch));
      if (selectedBranch) {
        setCity(String(selectedBranch.cityId));
      }
    }
  }, [branch]);

  async function searchMedia() {
    // Get media based on search criteria

    //Construct query string
    const queryParams = new URLSearchParams();
    if (title) {
      queryParams.set("title", title);
    }
    if (genre) {
      queryParams.set("genreId", genre);
    }
    if (author) {
      queryParams.set("authorId", author);
    }
    if (publisher) {
      queryParams.set("publisherId", publisher);
    }
    if (city) {
      queryParams.set("cityId", city);
    }
    if (branch) {
      queryParams.set("branchId", branch);
    }
    const mediaRes = await fetch(`/api/media?${queryParams.toString()}`);
    const media = await mediaRes.json();
  }

  return (
    <div>
      <div className="space-x-2 space-y-2">
        <Input
          placeholder="Search title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="block p-2"
        />
        <ComboBox
          comboBoxValues={genres}
          placeholder="Search genre..."
          emptyText="No matching genres"
          value={genre}
          setValue={setGenre}
        />
        <ComboBox
          comboBoxValues={authors}
          placeholder="Search authors..."
          emptyText="No matching authors"
          value={author}
          setValue={setAuthor}
        />
        <ComboBox
          comboBoxValues={publishers}
          placeholder="Search publishers..."
          emptyText="No matching publishers"
          value={publisher}
          setValue={setPublisher}
        />
        <ComboBox
          comboBoxValues={cities}
          placeholder="Search cities..."
          emptyText="No matching cities"
          value={city}
          setValue={setCity}
        />
        <ComboBox
          comboBoxValues={branchesComboBoxValues}
          placeholder="Search branches..."
          emptyText="No matching branches"
          value={branch}
          setValue={setBranch}
        />
        <Button onClick={searchMedia}>Search</Button>
      </div>
      <div>{/* Display media */}</div>
    </div>
  );
}
