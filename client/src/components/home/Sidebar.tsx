import { ScrollArea } from "@/components/ui/scroll-area";
import type { IUserUploadedPdf } from "@/types/IUserUploadedPdf";
import type React from "react";
import { Link } from "react-router";
import { APPROUTES } from "@/constant/routes";
import { FileText } from "lucide-react";

interface SidebarProps {
  userUploadedPdfs: IUserUploadedPdf[];
}

const Sidebar: React.FC<SidebarProps> = ({ userUploadedPdfs }) => {
  return (
    <aside className="w-64 border-r border-border bg-background flex flex-col h-screen">
      <div className="px-6 pt-6 pb-2">
        <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/70 mb-4">
          Your Library
        </h2>
      </div>

      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-2 px-3 pb-4">
          {userUploadedPdfs.map((pdf) => (
            <Link
              to={`${APPROUTES.extract}/${pdf._id}`}
              key={pdf._id}
              className="group block no-underline"
            >
              <div className="flex items-center p-3 border border-transparent rounded-xl transition-all duration-200 hover:bg-accent hover:border-border shadow-sm bg-card/50">
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
                  <h3 className="text-sm font-semibold text-foreground leading-snug  line-clamp-2 group-hover:text-accent-foreground">
                    {pdf.fileName}
                  </h3>
                  {/* <p className="text-[10px] text-muted-foreground/60 font-medium mt-1">
                    Added recently
                  </p> */}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </ScrollArea>
    </aside>
  );
};

export default Sidebar;
