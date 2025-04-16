"use client";
import { INVENTORY_API } from "@/lib/apiEndPoint";
import { useEffect, useState } from "react";
import Combobox from "../comboBox";
import { SearchStateProps } from "../type/searchStateProps";

const CACHE_NAME = "branches_cache";

interface ApiResponse {
  id: number;
  name: string;
}

interface Values {
  label: string;
  value: string;
}

const Branches = ({ searchParams, setSearchParams }: SearchStateProps) => {
  const [branches, setbranches] = useState<Values[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    // Check if data is already cached
    const cached = localStorage.getItem(CACHE_NAME);
    if (cached) {
      const { data, expiry } = JSON.parse(cached);
      if (Date.now() < expiry) {
        setbranches(data);
        setLoading(false);
        return;
      }
    }

    // Fetch data from an external API
    const request = await fetch(`${INVENTORY_API}branches`);
    // Check if the request was successful
    if (!request.ok) {
      setError(request.statusText);
      setLoading(false);
      return;
    }
    // Parse the JSON response
    const response: ApiResponse[] = await request.json();
    // Map the response to the desired format
    const data = response.map((item) => ({
      label: item.name,
      value: item.id.toString(),
    }));

    // Cache the data in localStorage with an expiry time
    localStorage.setItem(
      CACHE_NAME,
      JSON.stringify({ data, expiry: Date.now() + 10 * 60 * 1000 }),
    );

    // Set the branches state with the mapped data
    setbranches(data);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return (
      <div className="flex-1 rounded-lg bg-white p-2 text-center font-bold text-muted-foreground">
        <p>Loading...</p>
      </div>
    );
  }

  if (branches.length === 0 || error) {
    return (
      <div className="flex-1 rounded-lg bg-white p-2 text-center font-bold text-muted-foreground">
        {error || "Could not load branches"}
      </div>
    );
  }

  return (
    <Combobox
      type="branches"
      data={branches}
      context={{ searchParams, setSearchParams }}
      notFound="Could not find any branches"
      placeholder="Please select a branches"
    />
  );
};

export default Branches;
