"use client";

import Image from "next/image";
import { useState } from "react";
import type { Movie } from "@/lib/types";
import { getStrapiMediaUrl } from "@/lib/api";

interface PosterImageProps {
    movie: Movie;
    fill?: boolean;
    width?: number;
    height?: number;
    className?: string;
    priority?: boolean;
    sizes?: string;
}

export default function PosterImage({
    movie,
    fill = false,
    width,
    height,
    className = "",
    priority = false,
    sizes = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw",
}: PosterImageProps) {
    const [hasError, setHasError] = useState(false);

    const posterUrl = movie.poster?.url
        ? getStrapiMediaUrl(movie.poster.url)
        : null;

    // Fallback: grey gradient with film icon and movie title
    if (!posterUrl || hasError) {
        return (
            <div
                className={`flex flex-col items-center justify-center bg-gradient-to-br from-bg-surface-2 to-bg-surface-1 ${fill ? "absolute inset-0" : ""
                    } ${className}`}
                style={!fill ? { width, height } : undefined}
            >
                <svg
                    className="h-12 w-12 text-text-secondary/40 mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M7 4V20M17 4V20M3 8H7M17 8H21M3 12H21M3 16H7M17 16H21M4 20H20C20.5523 20 21 19.5523 21 19V5C21 4.44772 20.5523 4 20 4H4C3.44772 4 3 4.44772 3 5V19C3 19.5523 3.44772 20 4 20Z"
                    />
                </svg>
                <span className="text-xs text-text-secondary/60 text-center px-2 line-clamp-2">
                    {movie.title}
                </span>
            </div>
        );
    }

    if (fill) {
        return (
            <Image
                src={posterUrl}
                alt={`${movie.title} poster`}
                fill
                sizes={sizes}
                priority={priority}
                className={className}
                onError={() => setHasError(true)}
            />
        );
    }

    return (
        <Image
            src={posterUrl}
            alt={`${movie.title} poster`}
            width={width || 300}
            height={height || 450}
            sizes={sizes}
            priority={priority}
            className={className}
            onError={() => setHasError(true)}
        />
    );
}
