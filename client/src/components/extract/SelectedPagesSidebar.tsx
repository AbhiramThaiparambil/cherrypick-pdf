import type { IThumbnail } from "@/pages/ExtractPage";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { FileText, Download } from "lucide-react";
import { SelectedPageCard } from "./SelectedPageCard";
import { Spinner } from "../ui/spinner";

interface Props {
  selectedPages: IThumbnail[];
  generateNewPDF: () => void;
  onRemove: (id: number) => void;
  isgenerateNewPdf: boolean;
}

export default function SelectedPagesSidebar({
  selectedPages,
  onRemove,
  generateNewPDF,
  isgenerateNewPdf,
}: Props) {
  return (
    <div className="md:w-80  w-46 border-l  bg-muted/30 flex flex-col shadow-sm  overflow-hidden mb-1">
      <div className="p-4 border-b bg-background flex items-center justify-between shrink-0">
        <h2 className="font-semibold text-sm tracking-tight text-foreground">
          Selected Pages
        </h2>
        <Badge variant="outline" className="bg-background shadow-sm">
          {selectedPages.length}
        </Badge>
      </div>

      <ScrollArea className="flex-1 min-h-0">
        <div className="p-3">
          {selectedPages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground italic text-xs space-y-2">
              <FileText className="h-8 w-8 opacity-20" />
              <p>No pages selected</p>
            </div>
          ) : (
            <div className="space-y-2">
              {selectedPages.map((item, index) => (
                <SelectedPageCard
                  key={`${item.page}-${index}`}
                  page={item.page}
                  thumbnail={item.thumbnail}
                  onRemove={onRemove}
                />
              ))}
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t bg-background shrink-0">
        {/* <Button variant="outline" disabled size="sm">
          <Spinner data-icon="inline-start" />
          Please wait
        </Button> */}

        <Button
          onClick={generateNewPDF}
          disabled={selectedPages.length === 0 || isgenerateNewPdf}
          className="w-full shadow-sm gap-2 font-medium"
        >
          {isgenerateNewPdf ? (
            <>
              <Spinner data-icon="inline-start" />
              Please wait
            </>
          ) : (
            <>
              {" "}
              <Download className="h-4 w-4" />
              Generate PDF
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
