export type SearchOptions =
  | "title"
  | "genres"
  | "authors"
  | "publishers"
  | "cities"
  | "branches";

export interface SearchState {
  title: string;
  genres: string;
  authors: string;
  publishers: string;
  cities: string;
  branches: string;
}

export interface SearchStateProps {
  searchParams: SearchState;
  setSearchParams: React.Dispatch<React.SetStateAction<SearchState>>;
}
