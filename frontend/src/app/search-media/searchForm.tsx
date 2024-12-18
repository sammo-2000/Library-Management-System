"use client";
import React, { useEffect } from "react";
import type { ComboBoxValue } from "./comboBox";
import { ComboBox } from "./comboBox";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Media, MediaResponse } from "@/types/inventoryServiceTypes";
import MediaCard from "./mediaCard";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { INVENTORY_API } from "@/lib/apiEndPoint";

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
  const router = useRouter();
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
  const [page, setPage] = React.useState(searchParams.get("page") || "1");

  const [pageCount, setPageCount] = React.useState(1);

  const [branchesComboBoxValues, setBranchesComboBoxValues] = React.useState<
    ComboBoxValue[]
  >(
    branches.map((branch) => ({
      value: String(branch.id),
      label: branch.name,
    })),
  );

  const [media, setMedia] = React.useState<Media[]>([]);

  const [queryParams, setQueryParams] = React.useState("");

  const [error, setError] = React.useState("");

  useEffect(() => {
    // Search media based on initial query params
    async function initialSearch() {
      const media = await searchMedia();
      setMedia(media);
    }
    initialSearch();
  }, []);

  useEffect(() => {
    // Filter branches based on selected city
    if (city) {
      const branchesValues = branches
        .filter((branch) => branch.cityId === parseInt(city))
        .map((branch) => ({ value: String(branch.id), label: branch.name }));
      branchesValues.unshift({ value: "", label: "All branches" });
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

  useEffect(() => {
    onSearchClick();
  }, [page]);

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

    setQueryParams(queryParams.toString());
    if (page) {
      queryParams.set("page", page);
    }
    //Set URL to include query string
    router.push(`?${queryParams.toString()}`);
    try {
      const mediaRes = await fetch(
        `${INVENTORY_API}media?${queryParams.toString()}`,
      );
      if (!mediaRes.ok) {
        const error = await mediaRes.json();
        setError(error.message);
        throw new Error(error.message);
      }
      const media: MediaResponse = await mediaRes.json();
      setPageCount(calculatePageCount(media.total));
      setError("");
      return media.media;
    } catch (error) {
      setError("Search Failed");
      setPageCount(1);
      return [];
    }
  }

  async function onSearchClick() {
    const media = await searchMedia();
    setMedia(media);
  }

  function calculatePageCount(total: number) {
    const pageCount = Math.ceil(total / 20);
    if (pageCount === 0) {
      return 1;
    }
    return pageCount;
  }

  function PaginationComponent({
    pageCount,
    currentPage,
    queryParams,
  }: PaginationComponentProps): React.JSX.Element {
    if (pageCount === 1) {
      return <></>;
    }
    let pages: number[] = [];
    let startEllipse = false;
    let endEllipse = false;
    if (pageCount <= 3) {
      pages = Array.from({ length: pageCount }, (_, i) => i + 1);
    } else if (pageCount > 3) {
      if (currentPage === 1) {
        pages = [1, 2, 3];
        endEllipse = true;
      } else if (currentPage === pageCount) {
        pages = [currentPage - 2, currentPage - 1, currentPage];
        startEllipse = true;
      } else if (currentPage === 2) {
        pages = [currentPage - 1, currentPage, currentPage + 1];
        endEllipse = true;
      } else if (currentPage === pageCount - 1) {
        pages = [currentPage - 1, currentPage, currentPage + 1];
        startEllipse = true;
      } else {
        pages = [currentPage - 1, currentPage, currentPage + 1];
        startEllipse = true;
        endEllipse = true;
      }
    }

    function onPaginationLinkClick(page: number) {
      setPage(String(page));
    }

    return (
      <Pagination>
        <PaginationContent>
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious
                href={`?${queryParams}&page=${currentPage - 1}`}
                onClick={() => onPaginationLinkClick(currentPage - 1)}
              />
            </PaginationItem>
          )}
          {startEllipse && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {pages.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href={`?${queryParams}&page=${page}`}
                isActive={page === currentPage}
                onClick={() => onPaginationLinkClick(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          {endEllipse && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {currentPage < pageCount && (
            <PaginationItem>
              <PaginationNext
                href={`?${queryParams}&page=${currentPage + 1}`}
                onClick={() => onPaginationLinkClick(currentPage + 1)}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    );
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
        <Button onClick={onSearchClick}>Search</Button>
      </div>
      <div className="p-2">
        {media.length > 0 ? (
          media.map((pieceOfMedia) => (
            <MediaCard key={pieceOfMedia.id} media={pieceOfMedia} />
          ))
        ) : (
          <div className="text-center">No media found</div>
        )}
      </div>
      {error && (
        <div className="rounded bg-red-400 text-center text-white">{error}</div>
      )}
      <div className="flex justify-center">
        <PaginationComponent
          pageCount={pageCount}
          currentPage={parseInt(page)}
          queryParams={queryParams}
        />
      </div>
    </div>
  );
}

interface PaginationComponentProps {
  pageCount: number;
  currentPage: number;
  queryParams: string;
}
