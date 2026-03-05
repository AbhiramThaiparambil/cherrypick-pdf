import axios from "axios";

export const createPdf = async (uploadPdf: File) => {
  const formData = new FormData();
  formData.append("pdf", uploadPdf);
  const res = axios.post("http://localhost:4040/upload-pdf", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res;
};
