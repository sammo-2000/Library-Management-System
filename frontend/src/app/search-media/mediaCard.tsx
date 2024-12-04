import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Media } from "@/types/inventoryServiceTypes";
import Link from "next/link";

interface MediaCardProps {
  media: Media;
}

export default function MediaCard({ media }: MediaCardProps) {
  return (
    <Card className="m-2">
      <CardHeader>
        <CardTitle>
          <Link href={`/search-media/${media.id}`}>{media.title}</Link>
        </CardTitle>
        <CardDescription>{media.description}</CardDescription>
      </CardHeader>
    </Card>
  );
}
