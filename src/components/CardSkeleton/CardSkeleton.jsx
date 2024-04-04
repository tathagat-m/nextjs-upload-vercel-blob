import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Pencil2Icon, TrashIcon, DownloadIcon } from "@radix-ui/react-icons";
import { Skeleton } from "../ui/skeleton";

export default function CardSkeleton() {
  return (
    <Card className="w-[250px] h-[100px] m-4 p-2">
      <CardContent className="p-3 flex items-center gap-5">
        <Skeleton className="h-[50px] w-[50px]" />
        <div>
          <Skeleton className="text-sm font-semibold text-ellipsis max-w-[140px] whitespace-nowrap overflow-hidden" />
          <div className="flex justify-evenly items-center">
            <Button variant="ghost" size="icon">
              <Pencil2Icon className="h-4 w-4" />
            </Button>

            <Button variant="ghost" size="icon">
              <TrashIcon className="h-4 w-4" />
            </Button>

            <Button variant="ghost" size="icon">
              <DownloadIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
