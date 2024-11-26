import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Media } from "@/types/inventoryServiceTypes";

interface MediaCardProps {
  media: Media;
}

export default function MediaCard({ media }: MediaCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{media.title}</CardTitle>
        <CardDescription>{media.description}</CardDescription>
      </CardHeader>
    </Card>
  );
}
