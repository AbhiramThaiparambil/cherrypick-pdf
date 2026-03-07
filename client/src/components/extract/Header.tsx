import { FileText } from "lucide-react";

interface DocumentHeaderProps {
  fileName: string;
  totalCount: number;
}

export default function Header({ fileName, totalCount }: DocumentHeaderProps) {
  return (
    <div className="flex items-center justify-between py-3 px-6 border-b bg-background shadow-sm">
      <div className="flex items-center gap-2">
        <h1 className="text-[13px] font-extrabold tracking-wider text-foreground uppercase">
          Document Pages ({totalCount})
        </h1>
      </div>

      <div className="flex items-center gap-2 text-foreground/80">
        <span className="text-[12px] font-medium max-w-62.2 truncate italic">
          {fileName}
        </span>
        <FileText className="h-3.5 w-3.5 opacity-60" />
      </div>
    </div>
  );
}
