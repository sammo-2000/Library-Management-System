"use client";
import { INVENTORY_API } from "@/lib/apiEndPoint";
import { useEffect, useState } from "react";
import Combobox from "../comboBox";
import { SearchStateProps } from "../type/searchStateProps";

const CACHE_NAME = "cities_cache";

interface ApiResponse {
  id: number;
  city: string;
}

interface Values {
  label: string;
  value: string;
}

const Cities = ({ searchParams, setSearchParams }: SearchStateProps) => {
  const [cities, setCities] = useState<Values[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    // Check if data is already cached
    const cached = localStorage.getItem(CACHE_NAME);
    if (cached) {
      const { data, expiry } = JSON.parse(cached);
      if (Date.now() < expiry) {
        setCities(data);
        setLoading(false);
        return;
      }
    }

    // Fetch data from an external API
    const request = await fetch(`${INVENTORY_API}cities`);
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
      label: item.city,
      value: item.id.toString(),
    }));

    // Cache the data in localStorage with an expiry time
    localStorage.setItem(
      CACHE_NAME,
      JSON.stringify({ data, expiry: Date.now() + 10 * 60 * 1000 }),
    );

    // Set the cities state with the mapped data
    setCities(data);
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

  if (cities.length === 0 || error) {
    return (
      <div className="flex-1 rounded-lg bg-white p-2 text-center font-bold text-muted-foreground">
        {error || "Could not load cities"}
      </div>
    );
  }

  return (
    <Combobox
      type="cities"
      data={cities}
      context={{ searchParams, setSearchParams }}
      notFound="Could not find any cities"
      placeholder="Please select a cities"
    />
  );
};

export default Cities;
