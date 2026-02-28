import Link from "next/link";

interface EmptyStateProps {
    title?: string;
    message: string;
    ctaText?: string;
    ctaHref?: string;
}

export default function EmptyState({
    title = "No movies found",
    message,
    ctaText = "Browse all movies",
    ctaHref = "/",
}: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
            {/* Film icon */}
            <svg
                className="h-20 w-20 text-text-secondary/30 mb-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M7 4V20M17 4V20M3 8H7M17 8H21M3 12H21M3 16H7M17 16H21M4 20H20C20.5523 20 21 19.5523 21 19V5C21 4.44772 20.5523 4 20 4H4C3.44772 4 3 4.44772 3 5V19C3 19.5523 3.44772 20 4 20Z"
                />
            </svg>
            <h3 className="text-xl font-semibold text-text-primary mb-2">{title}</h3>
            <p className="text-sm text-text-secondary max-w-md mb-6">{message}</p>
            <Link
                href={ctaHref}
                className="inline-flex items-center rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-bg-base hover:bg-accent-hover transition-colors"
            >
                {ctaText}
            </Link>
        </div>
    );
}
