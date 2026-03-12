import { ScrollArea } from "@/components/ui/scroll-area";
import type { IUserUploadedPdf } from "@/types/IUserUploadedPdf";
import type React from "react";
import { Link } from "react-router";
import { APPROUTES } from "@/constant/routes";
import { FileText, Trash2 } from "lucide-react";
import { Spinner } from "../ui/spinner";

interface SidebarProps {
  userUploadedPdfs: IUserUploadedPdf[];
  deletePdf: (id: string) => void;
  isDeleting: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ userUploadedPdfs, deletePdf, isDeleting }) => {
  return (
    <aside className="w-full border-r border-border bg-background flex flex-col h-full">
      <div className="px-6 pt-6 pb-2">
        <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/70 mb-4">
          Your Library
        </h2>
      </div>

      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-2 px-3 pb-4">
          {userUploadedPdfs.map((pdf) => (
            <div key={pdf._id} className="group relative">
              <button
                onClick={() => deletePdf(pdf._id)}
                disabled={isDeleting}
                className={`absolute -top-2 -right-2 z-10 p-1.5 bg-background border border-border rounded-full text-muted-foreground  hover:text-destructive hover:shadow-md transition-all duration-200 opacity-0 group-hover:opacity-100`}
                title="Delete PDF"
              >


                {isDeleting ? <Spinner /> : <Trash2 size={14} />}




              </button>

              <Link
                to={`${APPROUTES.extract}/${pdf._id}`}
                className="block no-underline"
              >
                <div className="flex items-center p-3 border border-transparent rounded-xl transition-all duration-200 hover:bg-accent hover:border-border shadow-sm bg-card/50 group-hover:shadow-md">
                  <div className="mr-3 shrink-0">
                    <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-foreground/5">
                      <FileText
                        className="w-5 h-5 text-foreground"
                        strokeWidth={2.5}
                      />
                      <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-background border border-border text-[7px] font-black text-destructive">
                        PDF
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col min-w-0">
                    <h3 className="text-sm font-semibold text-foreground leading-snug line-clamp-2 group-hover:text-accent-foreground">
                      {pdf.fileName}
                    </h3>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </ScrollArea>
    </aside>
  );
};

export default Sidebar;
