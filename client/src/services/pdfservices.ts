import axios from "axios";

export const createPdf = async (uploadPdf: File) => {
  const formData = new FormData();
  formData.append("pdf", uploadPdf);
  const res = axios.post("http://localhost:4040/upload-pdf", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res;
};

export const getPdfthumbnails = async (
  id: string,
  limit: number,
  page: number,
) => {
  return await axios.get(
    `http://localhost:4040/pdf/${id}/thumbnails?limit=${limit}&page=${page}`,
  );
};

export const generateExtractPdf = async (pdfId: string, pages: number[]) => {
  return await axios.post(
    "http://localhost:4040/pdf/generate",
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
    return await axios.get(`http://localhost:4040/pdf/user-uploaded`);
  };




  export const deletePdfById = async (id:string) =>
  
  {
    return await axios.delete(`http://localhost:4040/pdf/${id}`);
  };