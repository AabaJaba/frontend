import { getMovies, getGenres } from "@/lib/api";
import MovieGrid from "@/components/movies/MovieGrid";
import GenreTag from "@/components/movies/GenreTag";
import EmptyState from "@/components/movies/EmptyState";
import { SkeletonGrid } from "@/components/movies/SkeletonCard";
import { Suspense } from "react";

interface HomePageProps {
  searchParams: Promise<{ genre?: string }>;
}

async function MovieSection({ genre }: { genre?: string }) {
  try {
    const [moviesRes, genres] = await Promise.all([
      getMovies({ genre, pageSize: 20 }),
      getGenres(),
    ]);

    const movies = moviesRes.data;

    return (
      <>
        {/* Genre filter pills — right below header */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          <GenreTag
            genre={{ id: 0, documentId: "all", name: "All", slug: "" }}
            variant="filled"
            isActive={!genre}
            asLink
          />
          {genres.map((g) => (
            <GenreTag
              key={g.id}
              genre={g}
              variant="outlined"
              isActive={genre === g.slug}
              asLink
            />
          ))}
        </div>

        {/* Movie grid — directly after pills */}
        {movies.length > 0 ? (
          <MovieGrid movies={movies} />
        ) : (
          <EmptyState
            message={
              genre
                ? `No movies found in this genre. Try browsing all movies.`
                : "No movies available yet. Check back soon!"
            }
          />
        )}
      </>
    );
  } catch {
    return (
      <EmptyState
        title="Something went wrong"
        message="We couldn't load the movies. Please try again later."
        ctaText="Retry"
        ctaHref="/"
      />
    );
  }
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const genre = params.genre;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <Suspense fallback={<SkeletonGrid count={8} />}>
        <MovieSection genre={genre} />
      </Suspense>
    </div>
  );
}
