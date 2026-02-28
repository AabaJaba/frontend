import type { Movie } from "@/lib/types";
import MovieCard from "./MovieCard";

interface MovieGridProps {
    movies: Movie[];
}

export default function MovieGrid({ movies }: MovieGridProps) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    );
}
