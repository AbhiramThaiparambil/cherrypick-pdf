import { useEffect, useState } from "react";
import ThumbnailCard from "@/components/extract/ThumbnailCards";
import SelectedPagesSidebar from "@/components/extract/SelectedPagesSidebar";
import { useParams } from "react-router";
import { generateExtractPdf, getPdfthumbnails } from "@/services/pdfservices";
import Pagination from "@/components/shared/Pagination";
import Header from "@/components/extract/Header";
import { toast } from "sonner";
import { downloadFile } from "@/lib/downloadFile";
import { ThumbnailSkeleton } from "@/components/extract/Skeleton/ThumbnailSkeleton";
import { SidebarSkeleton } from "@/components/extract/Skeleton/SelectedPagesSidebarSkeleton";

export type IThumbnail = { thumbnail: string; page: number };

export interface IGetPdfThumbnailsDTO {
  thumbnails: { thumbnail: string; page: number }[];
  fileName: string;
  count: number;
}

const ExtractPage = () => {
  const [thumbnails, setThumbnails] = useState<IThumbnail[]>([]);
  const [selectedPages, setSelectedPages] = useState<IThumbnail[]>([]);
  const [isgenerateNewPdf, setGenerateNewPdf] = useState(false);
  const [pdfDetails, setPdfDetails] = useState<{
    totalCount: number;
    fileName: string;
  }>({ fileName: "", totalCount: 0 });
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const limit = 6;
  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      return;
    }
    const fetchThumbnails = async () => {
      try {
        const response = await getPdfthumbnails(id, limit, page);
        if (response.status === 200) {
          setPdfDetails({
            fileName: response.data.fileName,
            totalCount: response.data.count,
          });
          setThumbnails(response?.data.thumbnails || []);
        }
      } catch (error) {
        console.error("Error fetching thumbnails:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchThumbnails();
  }, [id, page]);

  async function generateNewPDF() {
    setGenerateNewPdf(true);
    try {
      if (!id) {
        console.log("pdf id missing");
        return;
      }

      const selectedIndex = selectedPages.map((d) => d.page);

      const promise = generateExtractPdf(id, selectedIndex);
      toast.promise(promise, {
        loading: "Generating PDF...",
        success: "PDF generated successfully",
        error: "Failed to generate PDF",
      });

      const res = await promise;
      downloadFile(res.data, "Generated_Document.pdf", "application/pdf");
      console.log("Generating PDF with pages:", selectedPages);
    } catch (error) {
      console.log(error);
    } finally {
      setGenerateNewPdf(false);
    }
  }

  const togglePage = (data: IThumbnail) => {
    setSelectedPages((prev) => {
      const exists = prev.find((p) => p.page === data.page);

      if (exists) {
        return prev.filter((p) => p.page !== data.page);
      }

      return [...prev, data];
    });
  };

  if (loading) {
    return (
      <>
        <Header fileName={"loading"} totalCount={0} />
        <div className="flex h-full overflow-hidden p-2 md:px-10">
          <ThumbnailSkeleton limit={limit} />
          <SidebarSkeleton />
        </div>
      </>
    );
  }

  return (
    <>
      <Header
        fileName={pdfDetails.fileName}
        totalCount={pdfDetails.totalCount}
      />
      <div className="flex h-full overflow-hidden p-2">
        <div className="flex-1 overflow-auto lg:px-28 ">
          <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-6">
            {" "}
            {thumbnails.length > 0 ? (
              thumbnails.map((thumbnail, index) => (
                <ThumbnailCard
                  key={index}
                  pageNumber={thumbnail.page}
                  thumbnail={thumbnail.thumbnail}
                  selected={selectedPages.some(
                    (p) => p.page === thumbnail.page,
                  )}
                  onSelect={() => togglePage(thumbnail)}
                />
              ))
            ) : (
              <p>No thumbnails found.</p>
            )}
          </div>
        </div>

        <SelectedPagesSidebar
          selectedPages={selectedPages}
          onRemove={(page: number) =>
            setSelectedPages((prev) => prev.filter((p) => p.page !== page))
          }
          generateNewPDF={generateNewPDF}
          isgenerateNewPdf={isgenerateNewPdf}
        />
      </div>

      <Pagination
        currentPage={page}
        limit={limit}
        totalCount={pdfDetails.totalCount}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </>
  );
};

export default ExtractPage;
