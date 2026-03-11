import api from "@/lib/api";

export const createPdf = async (uploadPdf: File) => {
  const formData = new FormData();
  formData.append("pdf", uploadPdf);
  const res = api.post("/upload-pdf", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res;
};

export const getPdfthumbnails = async (
  id: string,
  limit: number,
  page: number,
) => {
  return await api.get(`/pdf/${id}/thumbnails?limit=${limit}&page=${page}`);
};

export const generateExtractPdf = async (pdfId: string, pages: number[]) => {
  return await api.post(
    "/pdf/generate",
    {
      pdfId,
      pages,
    },
    {
      responseType: "blob",
    },
  );
};

export const getUserPdfs = async () =>
  // limit: number,
  // page: number,
  {
    return await api.get(`/pdf/user-uploaded`);
  };




export const deletePdfById = async (id: string) => {
  return await api.delete(`/pdf/${id}`);
};