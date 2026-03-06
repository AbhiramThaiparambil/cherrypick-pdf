import React, { useEffect, useState } from "react";
import axios from "axios";
import { Spinner } from "@/components/ui/spinner";
import ThumbnailCard from "@/components/extract/ThumbnailCards";
import SelectedPagesSidebar from "@/components/extract/SelectedPagesSidebar";

export type IThumbnails = { thumbnail: string; page: number }[];

export interface IGetPdfThumbnailsDTO {
  thumbnails: { thumbnail: string; page: number }[];
  fileName: string;
  count: number;
}

const ExtractPage = () => {
  const [thumbnails, setThumbnails] = useState<IThumbnails>([]);
  const [selectedPages, setSelectedPages] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchThumbnails = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4040/pdf/69a96b148f2449e0acdb3a12/thumbnails",
        );

        if (response.status === 200) {
          setThumbnails(response.data?.thumbnails || []);
        }
      } catch (error) {
        console.error("Error fetching thumbnails:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchThumbnails();
  }, []);

  const togglePage = (index: number) => {
    setSelectedPages((prev) =>
      prev.includes(index) ? prev.filter((p) => p !== index) : [...prev, index],
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      {/* LEFT SIDE - THUMBNAILS */}
      <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-4 gap-6">
          {thumbnails.length > 0 ? (
            thumbnails.map((thumbnail, index) => (
              <ThumbnailCard
                key={index}
                pageNumber={thumbnail.page}
                thumbnail={thumbnail.thumbnail}
                selected={selectedPages.includes(thumbnail.page)}
                // onClick={() => togglePage(index)}
              />
            ))
          ) : (
            <p>No thumbnails found.</p>
          )}
        </div>
      </div>

      {/* RIGHT SIDE - SELECTED PAGES */}
      <SelectedPagesSidebar
        selectedPages={thumbnails}
        onRemove={(id: number) => console.log(id)}
      />
    </div>
  );
};

export default ExtractPage;
