import Link from "next/link";
import type { Movie } from "@/lib/types";
import PosterImage from "./PosterImage";
import GenreTag from "./GenreTag";

interface MovieCardProps {
    movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
    return (
        <Link
            href={`/movies/${movie.slug}`}
            className="group relative flex flex-col overflow-hidden rounded-xl bg-bg-surface-1 border border-border transition-all duration-300 hover:border-border-hover hover:-translate-y-1 hover:shadow-lg hover:shadow-shadow/50"
        >
            {/* Poster */}
            <div className="relative aspect-[2/3] w-full overflow-hidden">
                <PosterImage movie={movie} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg-base/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Info */}
            <div className="flex flex-col gap-2 p-3">
                <h3 className="text-sm font-semibold text-text-primary line-clamp-1 group-hover:text-accent transition-colors">
                    {movie.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-text-secondary">
                    <span>{movie.releaseYear}</span>
                    {movie.runtime > 0 && (
                        <>
                            <span className="text-border">•</span>
                            <span>{movie.runtime} min</span>
                        </>
                    )}
                </div>
                {/* Genre tags */}
                {movie.genres && movie.genres.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                        {movie.genres.slice(0, 2).map((genre) => (
                            <GenreTag key={genre.id} genre={genre} size="sm" variant="outlined" />
                        ))}
                    </div>
                )}
            </div>
        </Link>
    );
}
