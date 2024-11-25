export interface GenreResponse {
  id: number;
  genre: string;
}

export interface AuthorResponse {
  id: number;
  name: string;
}

export interface PublisherResponse {
  id: number;
  name: string;
}

export interface CityResponse {
  id: number;
  city: string;
}

export interface BranchResponse {
  id: number;
  name: string;
  City: CityResponse;
}

export interface MediaResponse {
  id: number;
  type: string;
  title: string;
  description: string;
  publishedDate: string,
  Author: AuthorResponse;
  Genre: GenreResponse;
  Publisher: PublisherResponse;
}
