import { FilePlus2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
// import PdfListItem from "./PdfListItem";

interface SidebarProps {
  pdfs: any[];
  activePdfId: string | null;
  setActivePdfId: (id: string) => void;
  setSelectedPages: (pages: Set<number>) => void;
  setActivePage: (page: number) => void;
}

// export default function Sidebar({
//   pdfs,
//   activePdfId,
//   setActivePdfId,
//   setSelectedPages,
//   setActivePage,
// }: SidebarProps) {

export default function Sidebar() {
  return (
    <aside className="w-64 flex-shrink-0 border-r border-border bg-background flex flex-col transition-colors">
      {/* Header Section */}
      <div className="px-6 pt-6 pb-2">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
          Your PDFs
        </h2>
      </div>

      {/* Scrollable List Area */}
      <ScrollArea className="flex-1 px-3">
        {/* <div className="flex flex-col gap-1 pr-3">
          {pdfs.map((pdf) => (
            <PdfListItem
              key={pdf.id}
              pdf={pdf}
              active={pdf.id === activePdfId}
              onClick={() => {
                setActivePdfId(pdf.id);
                setSelectedPages(new Set());
                setActivePage(1);
              }}
            />
          ))}
        </div> */}
      </ScrollArea>

      <div className="mt-auto border-t border-border p-4 bg-background/50 backdrop-blur-sm">
        <Button
          variant="secondary"
          className="w-full justify-start gap-2 shadow-sm"
        >
          <FilePlus2 size={16} />
          New Upload
        </Button>
      </div>
    </aside>
  );
}
