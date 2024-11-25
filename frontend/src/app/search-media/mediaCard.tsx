import { MediaResponse } from "@/types/inventoryServiceTypes";

interface MediaCardProps {
  media: MediaResponse;
}

export default function MediaCard({ media }: MediaCardProps) {
  return (
    <div className="m-2 p-2 shadow">
      <h2>{media.title}</h2>
      <p>{media.description}</p>
      <p>{media.publishedDate}</p>
    </div>
  );
}
