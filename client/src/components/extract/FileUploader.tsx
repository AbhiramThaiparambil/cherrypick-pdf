import { CloudUpload, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"; // Standard Shadcn utility

interface FileUploaderProps {
  isDragging: boolean;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent) => void;
}

export function FileUploader({
  isDragging,
  onDragOver,
  onDragLeave,
  onDrop,
}: FileUploaderProps) {
  return (
    <section
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={cn(
        "relative flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed py-12 transition-all duration-200",
        "bg-card/50 hover:bg-accent/50",
        isDragging
          ? "border-primary bg-primary/5 scale-[1.01]"
          : "border-border hover:border-primary/50",
      )}
    >
      <div
        className={cn(
          "flex h-16 w-16 items-center justify-center rounded-2xl transition-colors",
          isDragging ? "bg-primary/20" : "bg-secondary text-primary",
        )}
      >
        <CloudUpload size={32} className={isDragging ? "animate-bounce" : ""} />
      </div>

      <div className="text-center">
        <h3 className="text-xl font-semibold tracking-tight text-foreground">
          Upload New PDF
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Drag and drop your document here, or browse your files
          <br />
          to start extracting pages.
        </p>
      </div>

      {/* Action Button */}
      <Button className="mt-2 gap-2 rounded-xl px-6 shadow-lg">
        <Upload size={16} />
        Browse Files
      </Button>
    </section>
  );
}
