// const ExtractPage = () => {
//   return <div>ExtractPage</div>;
// };

// export default ExtractPage;

import { useState } from "react";

import Sidebar from "@/components/extract/Sidebar";
import { FileUploader } from "@/components/extract/FileUploader";

// ─── Sample Data ──────────────────────────────────────────────────────────────

// ─── Sub-components ───────────────────────────────────────────────────────────

// function PageThumbnail({
//   page,
//   selected,
//   active,
//   onToggle,
// }: {
//   page: (typeof PAGE_THUMBNAILS)[0];
//   selected: boolean;
//   active: boolean;
//   onToggle: () => void;
// }) {
//   return (
//     <div
//       className="flex flex-col items-center gap-2 cursor-pointer group"
//       onClick={onToggle}
//     >
//       {/* Card */}
//       <div
//         className={`relative w-[110px] h-[142px] rounded-xl border-2 transition-all duration-200 overflow-hidden
//           ${
//             active
//               ? "border-red-400 shadow-lg shadow-red-100 bg-white scale-[1.03]"
//               : selected
//                 ? "border-red-300 bg-white shadow-sm"
//                 : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
//           }`}
//       >
//         {/* Checkbox */}
//         <div
//           className={`absolute top-2 right-2 z-10 w-5 h-5 rounded flex items-center justify-center transition-all
//           ${selected ? "bg-red-500 border-red-500" : "bg-white border-2 border-gray-300"} border`}
//         >
//           {selected && <Check size={11} className="text-white stroke-[3]" />}
//         </div>

//         {/* Thumbnail content */}
//         <div className="p-3 pt-4 flex flex-col gap-1.5 h-full">
//           {page.hasImage && (
//             <div className="w-full h-14 rounded-md bg-gradient-to-br from-gray-200 to-gray-300 mb-1 flex-shrink-0" />
//           )}
//           {page.hasCircle && (
//             <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 mx-auto mb-1 flex-shrink-0" />
//           )}
//           {page.lines.map((len, i) => (
//             <div
//               key={i}
//               className={`h-2 rounded-full bg-gray-200`}
//               style={{ width: `${(len / 6) * 100}%` }}
//             />
//           ))}
//         </div>

//         {/* Active highlight overlay */}
//         {active && (
//           <div className="absolute inset-0 bg-red-500/5 pointer-events-none" />
//         )}
//       </div>

//       {/* Label */}
//       <span
//         className={`text-xs font-medium transition-colors ${
//           active ? "text-red-500" : "text-gray-500 group-hover:text-gray-700"
//         }`}
//       >
//         {page.label}
//       </span>
//     </div>
//   );
// }

// function PdfListItem({
//   pdf,
//   active,
//   onClick,
// }: {
//   pdf: (typeof SAMPLE_PDFS)[0];
//   active: boolean;
//   onClick: () => void;
// }) {
//   const iconColor =
//     pdf.icon === "report"
//       ? "text-red-400 bg-red-50"
//       : pdf.icon === "specs"
//         ? "text-blue-400 bg-blue-50"
//         : "text-orange-400 bg-orange-50";

//   return (
//     <div
//       onClick={onClick}
//       className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-150
//         ${
//           active
//             ? "bg-red-50 border border-red-200"
//             : "hover:bg-gray-100 border border-transparent"
//         }`}
//     >
//       <div
//         className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${iconColor}`}
//       >
//         <FileText size={15} />
//       </div>
//       <div className="flex-1 min-w-0">
//         <p
//           className={`text-sm font-medium truncate ${active ? "text-red-600" : "text-gray-700"}`}
//         >
//           {pdf.name}
//         </p>
//         <p className="text-xs text-gray-400">{pdf.date}</p>
//       </div>
//     </div>
//   );
// }

// ─── Main Component ───────────────────────────────────────────────────────────

export default function CherryPickPDF() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadPdf, setUploadPdf] = useState<File[]>();
  console.log(uploadPdf);
  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-300 bg-background`}
    >
      <div className="flex h-[calc(100vh-56px)]">
        <Sidebar />
        <main className="flex-1 overflow-y-auto px-8 py-7 flex flex-col gap-7">
          {uploadPdf && uploadPdf?.length > 0 && (
            <div className="flex ">
              {uploadPdf.map((d, i) => {
                const src = URL.createObjectURL(d);
                return (
                  <>
                    <iframe key={i} src={src} width="20%" height="100"></iframe>
                  </>
                );
              })}
            </div>
          )}

          <FileUploader
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
                  alert("no PDF FIles ");
                }
              }
            }}
          />
        </main>
      </div>
    </div>
  );
}
