export default function SkeletonCard() {
    return (
        <div className="flex flex-col overflow-hidden rounded-xl bg-bg-surface-1 border border-border animate-pulse">
            {/* Poster skeleton */}
            <div className="aspect-[2/3] w-full bg-bg-surface-2" />

            {/* Info skeleton */}
            <div className="flex flex-col gap-2 p-3">
                {/* Title */}
                <div className="h-4 w-3/4 rounded bg-bg-surface-2" />
                {/* Year + runtime */}
                <div className="h-3 w-1/2 rounded bg-bg-surface-2" />
                {/* Genre tags */}
                <div className="flex gap-1 mt-1">
                    <div className="h-5 w-12 rounded-full bg-bg-surface-2" />
                    <div className="h-5 w-16 rounded-full bg-bg-surface-2" />
                </div>
            </div>
        </div>
    );
}

export function SkeletonGrid({ count = 8 }: { count?: number }) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {Array.from({ length: count }).map((_, i) => (
                <SkeletonCard key={i} />
            ))}
        </div>
    );
}
