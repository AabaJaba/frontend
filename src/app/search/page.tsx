import { Suspense } from "react";
import type { Metadata } from "next";
import { getMovies, getGenres } from "@/lib/api";
import MovieGrid from "@/components/movies/MovieGrid";
import GenreTag from "@/components/movies/GenreTag";
import EmptyState from "@/components/movies/EmptyState";
import { SkeletonGrid } from "@/components/movies/SkeletonCard";

interface SearchPageProps {
    searchParams: Promise<{ q?: string; genre?: string }>;
}

export async function generateMetadata({
    searchParams,
}: SearchPageProps): Promise<Metadata> {
    const params = await searchParams;
    const query = params.q || "";

    return {
        title: query
            ? `Results for "${query}" — CineDex`
            : "Search — CineDex",
        description: `Search results for "${query}" on CineDex`,
    };
}

async function SearchResults({
    query,
    genre,
}: {
    query: string;
    genre?: string;
}) {
    try {
        const [moviesRes, genres] = await Promise.all([
            getMovies({ search: query || undefined, genre, pageSize: 20 }),
            getGenres(),
        ]);

        const movies = moviesRes.data;
        const total = moviesRes.meta.pagination.total;

        return (
            <>
                {/* Results count */}
                {query && (
                    <p className="text-sm text-text-secondary mb-6">
                        {total} result{total !== 1 ? "s" : ""} for &ldquo;
                        <span className="text-text-primary font-medium">{query}</span>
                        &rdquo;
                    </p>
                )}

                {/* Genre filter pills */}
                <div className="flex flex-wrap gap-2 mb-8">
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
                            variant="filled"
                            isActive={genre === g.slug}
                            asLink
                        />
                    ))}
                </div>

                {/* Results grid */}
                {movies.length > 0 ? (
                    <MovieGrid movies={movies} />
                ) : (
                    <EmptyState
                        message={
                            query
                                ? `No movies match "${query}". Try a different search term or browse all movies.`
                                : "Enter a search term to find movies."
                        }
                    />
                )}
            </>
        );
    } catch {
        return (
            <EmptyState
                title="Something went wrong"
                message="We couldn't complete your search. Please try again later."
                ctaText="Browse all movies"
                ctaHref="/"
            />
        );
    }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const params = await searchParams;
    const query = params.q || "";
    const genre = params.genre;

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-text-primary mb-2">
                {query ? (
                    <>
                        Results for &ldquo;
                        <span className="text-accent">{query}</span>&rdquo;
                    </>
                ) : (
                    "Search Movies"
                )}
            </h1>

            <Suspense fallback={<SkeletonGrid count={8} />}>
                <SearchResults query={query} genre={genre} />
            </Suspense>
        </div>
    );
}
