"use client";

import { INVENTORY_API } from "@/lib/apiEndPoint";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import MediaCard from "./mediaCard";
import { SearchState } from "./type/searchStateProps";

interface Media {
  id: number;
  type: string;
  title: string;
  description: string;
  publishedDate: string;
  Author: {
    id: number;
    name: string;
  };
  Publisher: {
    id: number;
    name: string;
  };
  Genre: {
    id: number;
    genre: string;
  };
}

const ListMedia = () => {
  const urlParam = useSearchParams();

  const [searchParams, setSearchParams] = useState<SearchState>({
    title: urlParam.get("title") || "",
    genres: urlParam.get("genres") || "",
    authors: urlParam.get("authors") || "",
    publishers: urlParam.get("publishers") || "",
    cities: urlParam.get("cities") || "",
    branches: urlParam.get("branches") || "",
  });

  useEffect(() => {
    setSearchParams({
      title: urlParam.get("title") || "",
      genres: urlParam.get("genres") || "",
      authors: urlParam.get("authors") || "",
      publishers: urlParam.get("publishers") || "",
      cities: urlParam.get("cities") || "",
      branches: urlParam.get("branches") || "",
    });
  }, [urlParam]);

  const filter = () => {
    return media.filter((item) => {
      const matchesTitle = searchParams.title
        ? item.title.toLowerCase().includes(searchParams.title.toLowerCase())
        : true;

      const matchesAuthor = searchParams.authors
        ? item.Author.name
            .toLowerCase()
            .includes(searchParams.authors.toLowerCase())
        : true;

      const matchesPublisher = searchParams.publishers
        ? item.Publisher.name
            .toLowerCase()
            .includes(searchParams.publishers.toLowerCase())
        : true;

      const matchesGenre = searchParams.genres
        ? item.Genre.genre
            .toLowerCase()
            .includes(searchParams.genres.toLowerCase())
        : true;

      return matchesTitle && matchesAuthor && matchesPublisher && matchesGenre;
    });
  };

  const [media, setMedia] = useState<Media[]>([]);
  const [filteredMedia, setFilteredMedia] = useState<Media[]>([]);

  const getMedia = async () => {
    const response = await fetch(`${INVENTORY_API}media`);
    const data = await response.json();
    setMedia(data.media);
  };

  const updateMedia = async () => {
    const queryParams = new URLSearchParams();

    if (searchParams.cities) queryParams.append("cityId", searchParams.cities);
    if (searchParams.branches)
      queryParams.append("branchId", searchParams.branches);

    const url = `${INVENTORY_API}media${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
    const response = await fetch(url);
    const data = await response.json();
    setMedia(data.media);
  };

  useEffect(() => {
    updateMedia();
  }, [searchParams.cities, searchParams.branches]);

  useEffect(() => {
    getMedia();
  }, [searchParams]);

  useEffect(() => {
    setFilteredMedia(filter());
  }, [searchParams, media]);

  return (
    <div>
      {filteredMedia &&
        filteredMedia.map((media) => (
          <MediaCard key={media.id} media={media} />
        ))}
    </div>
  );
};

export default ListMedia;
