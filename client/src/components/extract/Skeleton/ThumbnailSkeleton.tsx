import { Skeleton } from "@/components/ui/skeleton";

export function ThumbnailCardSkeleton() {
  return (
    <div className="rounded-lg border p-1 border-border bg-card">
      <div className="relative">
        <div className="absolute top-2 right-2 z-10">
          <Skeleton className="h-4 w-4 rounded" />
        </div>

        <div className="overflow-hidden rounded-md bg-muted">
          <Skeleton className="w-full h-60" />
        </div>
      </div>

      <div className="flex justify-center mt-2 pb-1">
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  );
}

export function ThumbnailSkeleton({ limit }: { limit: number }) {
  return (
    <>
      <div className="flex-1 overflow-auto ">
        <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-6">
          {new Array(limit).fill("-").map((_, i) => (
            <ThumbnailCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </>
  );
}
