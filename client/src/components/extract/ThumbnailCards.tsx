import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  thumbnail: string;
  pageNumber: number;
  selected?: boolean;
  onSelect: (page: number) => void;
}

export default function ThumbnailCard({
  thumbnail,
  pageNumber,
  selected,
  onSelect,
}: Props) {
  return (
    <div
      onClick={() => onSelect(pageNumber)}
      className={cn(
        "group relative cursor-pointer transition-all rounded-lg border p-1",
        selected
          ? "border-primary ring-2 ring-ring"
          : "border-border hover:border-muted-foreground/50",
      )}
    >
      {/* Selection Checkbox */}
      <div className="absolute top-2 right-2 z-10">
        <Checkbox
          checked={selected}
          onCheckedChange={() => onSelect(pageNumber)}
        />
      </div>

      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="secondary"
              size="sm"
              className="gap-2 shadow-md"
              onClick={(e) => e.stopPropagation()}
            >
              <Maximize2 className="h-4 w-4" />
              Expand
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Page {pageNumber} Preview</DialogTitle>
            </DialogHeader>
            <div className="flex justify-center bg-muted rounded-lg p-2">
              <img
                src={thumbnail}
                alt={`Page ${pageNumber} Preview`}
                className="max-h-[80vh] w-auto object-contain"
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="overflow-hidden rounded-md bg-muted">
        <img
          src={thumbnail}
          alt={`Page ${pageNumber}`}
          className="w-full h-60 object-contain"
        />
      </div>

      <p className="text-center text-sm font-medium mt-2 text-muted-foreground">
        Page {pageNumber}
      </p>
    </div>
  );
}
