import { Skeleton } from "@/components/ui/skeleton";

export function SidebarSkeleton() {
  return (
    <div className="md:w-80 w-46 border-l bg-muted/30 flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b bg-background flex items-center justify-between shrink-0">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-5 w-8 rounded-full" />
      </div>

      <div className="flex-1 p-3 space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-3 p-2 rounded-lg border border-border bg-background/50"
          >
            <Skeleton className="h-12 w-10 rounded-md shrink-0" />

            <div className="flex-1 space-y-2">
              <Skeleton className="h-3 w-16" />
            </div>

            <Skeleton className="h-6 w-6 rounded-md" />
          </div>
        ))}
      </div>

      <div className="p-4 border-t bg-background shrink-0">
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
}
