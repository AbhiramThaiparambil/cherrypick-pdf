import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface SelectedPageCardProps {
  page: number;
  thumbnail: string;
  onRemove: (page: number) => void;
}

export function SelectedPageCard({
  page,
  thumbnail,
  onRemove,
}: SelectedPageCardProps) {
  return (
    <div className="group flex items-center gap-3 bg-card p-2 rounded-lg border border-border shadow-sm transition-all hover:border-primary/40 hover:shadow-md">
      <div className="relative h-16 w-12 shrink-0 overflow-hidden rounded border border-input bg-muted">
        <img
          src={thumbnail}
          alt={`Page ${page}`}
          className="h-full w-full object-contain"
        />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground">Page {page}</p>
        <p className="text-[10px] text-muted-foreground font-mono">
          #{page.toString().padStart(2, "0")}
        </p>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => onRemove(page)}
        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}
