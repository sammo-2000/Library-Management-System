import { INVENTORY_API } from "@/lib/apiEndPoint";

export type Media = {
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
};

export const getAllMedias = async (): Promise<Media[] | string> => {
  const response = await fetch(`${INVENTORY_API}media`);

  if (!response.ok) return response.statusText;

  return await response.json();
};
