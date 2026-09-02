interface ContentSkeletonProps {
  rows?: number;
}

export default function ContentSkeleton({
  rows = 3,
}: ContentSkeletonProps) {
  return (
    <div className="w-full space-y-6">
      {/* Back link / small text */}
      <div className="h-5 w-40 animate-pulse rounded bg-muted" />

      {/* Page title */}
      <div className="h-8 w-64 animate-pulse rounded bg-muted" />

      {/* Main content */}
      <div className="rounded-2xl border bg-background p-6">
        <div className="space-y-4">
          {/* Section title */}
          <div className="h-6 w-48 animate-pulse rounded bg-muted" />

          {Array.from({ length: rows }).map((_, index) => (
            <div
              key={index}
              className={`h-5 animate-pulse rounded bg-muted ${
                index === rows - 1
                  ? "w-1/2"
                  : index === 1
                    ? "w-3/4"
                    : "w-full"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

