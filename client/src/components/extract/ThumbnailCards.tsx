// import { PdfPage } from "../types/pdf"

interface Props {
  thumbnail: string;
  pageNumber: number;
  selected?: boolean;
  //   onSelect: (page: PdfPage) => void
}

export default function ThumbnailCard({
  thumbnail,
  pageNumber,
  selected,
}: Props) {
  return (
    <div
      //   onClick={() => onSelect(page)}
      className={`relative   cursor-pointer transition 
      ${selected ? "border-blue-500 ring-2 ring-blue-400" : "border-gray-200"}`}
    >
      <input
        type="checkbox"
        checked={selected}
        readOnly
        className="absolute top-2 right-2"
      />

      <img src={thumbnail} className="w-full h-60 object-contain bg-gray-50" />

      <p className="text-center text-sm mt-2">Page {pageNumber}</p>
    </div>
  );
}
