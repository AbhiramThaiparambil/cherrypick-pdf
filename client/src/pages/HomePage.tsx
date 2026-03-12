

import { useEffect, useState } from "react";

import Sidebar from "@/components/home/Sidebar";
import { FileUploader } from "@/components/home/FileUploader";
import { toast } from "sonner";
import { createPdf, deletePdfById, getUserPdfs } from "@/services/pdfservices";
import { APPROUTES } from "@/constant/routes";
import { useNavigate } from "react-router";
import type { IUserUploadedPdf } from "@/types/IUserUploadedPdf";
import { Menu, X } from "lucide-react";

export default function HomePage() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadPdf, setUploadPdf] = useState<File[]>();
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [userUploadedPdfs, setUserUploadedPdfs] = useState<IUserUploadedPdf[]>(
    [],
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getUploadedPdf();
    if (uploadPdf && uploadPdf?.length > 0) {
      uploadPdfToServer();
    }
  }, [uploadPdf]);

  const uploadPdfToServer = async () => {
    if (!uploadPdf || uploadPdf.length === 0) return;

    try {
      setIsUploading(true);

      const apiPromise = createPdf(uploadPdf[0]);

      toast.promise(apiPromise, {
        loading: "Uploading PDF...",
        success: "Upload complete",
        error: "Upload failed",
      });
      const res = await apiPromise;

      if (res.status === 200) {
        const _id = res.data._id;
        navigate(`${APPROUTES.extract}/${_id}`);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  const getUploadedPdf = async () => {
    try {
      const res = await getUserPdfs();
      if (res.status == 200) {
        setUserUploadedPdfs(res.data || []);
      }
    } catch (error) { }
  };



  const deletePdf = async (id: string) => {
    try {
      setIsDeleting(true);
      const promise = deletePdfById(id)
      toast.promise(promise, {
        loading: "Deleting PDF...",
        success: "PDF deleted successfully",
        error: "Failed to delete PDF",
      });

      const res = await promise
      if (res.status == 200) {
        setUserUploadedPdfs((prv) => prv?.filter((f) => f._id !== id))

      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsDeleting(false);
    }
  };




  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-300 bg-background`}
    >
      <div className="flex h-[calc(100vh-56px)] relative">
        <button
          className="md:hidden fixed top-[68px] left-3 z-50 p-2 rounded-lg bg-background border border-border shadow-md"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {isSidebarOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black/40 z-30"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <div
          className={`
            fixed md:static z-40 h-[calc(100vh-56px)] md:w-1/3  w-80 transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            md:translate-x-0
          `}
        >
          <Sidebar userUploadedPdfs={userUploadedPdfs} deletePdf={deletePdf} isDeleting={isDeleting} />
        </div>

        <main className="flex-1 overflow-y-auto px-4 md:px-8 py-7 flex flex-col gap-7">
          <FileUploader
            isUploading={isUploading}
            setUploadPdf={(files: File[]) => setUploadPdf(files)}
            isDragging={isDragging}
            onDragOver={(e) => {
              e.preventDefault();

              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              const filesArray = Array.from(e.dataTransfer.files);

              if (filesArray.length > 0) {
                const pdfFiles = filesArray.find(
                  (d) => d.type === "application/pdf",
                );
                if (pdfFiles) {
                  setUploadPdf(filesArray);
                } else {
                  toast.error("Please select a PDF file");
                }
              }
            }}
          />
        </main>
      </div>
    </div>
  );
}

