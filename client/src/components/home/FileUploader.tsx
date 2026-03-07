import { CloudUpload, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRef } from "react";
import { toast } from "sonner";
import { Badge } from "../ui/badge";
import { Spinner } from "../ui/spinner";

interface FileUploaderProps {
  isUploading: boolean;
  setUploadPdf: (file: File[]) => void;
  isDragging: boolean;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent) => void;
}

export function FileUploader({
  isUploading,
  setUploadPdf,
  isDragging,
  onDragOver,
  onDragLeave,
  onDrop,
}: FileUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const fileUploadButton = () => {
    if (inputRef?.current) {
      inputRef.current.click();
    }
  };

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
      {isUploading ? (
        <>
          <Badge>
            <Spinner data-icon="inline-start" />
            Processing...
          </Badge>
        </>
      ) : (
        <>
          <div
            className={cn(
              "flex h-16 w-16 items-center justify-center rounded-2xl transition-colors",
              isDragging ? "bg-primary/20" : "bg-secondary text-primary",
            )}
          >
            <CloudUpload
              size={32}
              className={isDragging ? "animate-bounce" : ""}
            />
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

          <Button
            className="mt-2 gap-2 rounded-xl px-6 shadow-lg"
            onClick={fileUploadButton}
          >
            <Upload size={16} />
            Browse Files
          </Button>

          <input
            type="file"
            ref={inputRef}
            className="hidden"
            onChange={(e) => {
              if (e.target.files) {
                const uploadFile = Array.from(e.target.files);
                const pdfFile = uploadFile.find(
                  (d) => d.type == "application/pdf",
                );
                if (pdfFile) {
                  setUploadPdf([pdfFile]);
                } else {
                  toast.error("Please select a PDF file");
                }
              }

              console.log(e.target.files);
            }}
          />
        </>
      )}
    </section>
  );
}
