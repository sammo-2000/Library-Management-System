export interface Genre {
  id: number;
  genre: string;
}

export interface Author {
  id: number;
  name: string;
}

export interface Publisher {
  id: number;
  name: string;
}

export interface City {
  id: number;
  city: string;
}

export interface Branch {
  id: number;
  name: string;
  City: City;
}

export interface Media {
  id: number;
  type: string;
  title: string;
  description: string;
  publishedDate: string,
  Author: Author;
  Genre: Genre;
  Publisher: Publisher;
}

export interface MediaResponse {
  media: Media[];
  total: number;
}
