import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/helpers/dates";
import { INVENTORY_API } from "@/lib/apiEndPoint";
import { Media } from "@/types/inventoryServiceTypes";
import { redirect } from "next/navigation";
import Link from "next/link";

async function getMediaDetails(id: string) {
  try {
    const res = await fetch(INVENTORY_API + "media/" + id);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const media: Media = await res.json();
    return media;
  } catch (error) {
    console.log("Failed to fetch data");
    return null;
  }
}

export default async function MediaDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const media = await getMediaDetails(id);

  return (
    <>
      {media ? (
        <Card>
          <CardHeader>
            <CardTitle>{media.title}</CardTitle>
            <CardDescription>{media.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div>Author: {media.Author.name}</div>
            <div>Genre: {media.Genre.genre}</div>
            <div>Publisher: {media.Publisher.name}</div>
            <div>Type: {media.type}</div>
            <div>Published On: {formatDate(media.publishedDate)}</div>
            <div>
              <Link
                className="inline-block rounded-md bg-blue-500 px-4 py-2 text-white shadow hover:bg-blue-600"
                href={`/reservation?mediaId=${media.id}&mediaName=${media.title}`}
              >
                Get Media
              </Link>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div>Media not found</div>
      )}
    </>
  );
}
