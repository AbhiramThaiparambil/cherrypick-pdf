import type { IThumbnails } from "@/pages/ExtractPage";

interface Props {
  selectedPages: IThumbnails;

  onRemove: (id: number) => void;
}

export default function SelectedPagesSidebar({
  selectedPages,
  onRemove,
}: Props) {
  return (
    <div className="w-72 border-l bg-gray-50 h-screen flex flex-col">
      <div className="p-4 border-b font-semibold">
        Selected Pages ({selectedPages.length})
      </div>

      <div className="flex-1 overflow-auto p-3 space-y-3">
        {selectedPages.map((thumbnail, id) => (
          <div
            key={id}
            className="flex items-center gap-3 bg-white p-2 rounded border"
          >
            <img
              src={thumbnail.thumbnail}
              className="w-12 h-16 object-contain"
            />

            <div className="flex-1 text-sm">Page {thumbnail.page}</div>

            <button
              onClick={() => onRemove(thumbnail.page)}
              className="text-red-500 text-sm"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="p-4 border-t">
        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Generate PDF
        </button>
      </div>
    </div>
  );
}
