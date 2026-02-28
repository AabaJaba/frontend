import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getMovieBySlug, getMovies } from "@/lib/api";
import Breadcrumb from "@/components/movies/Breadcrumb";
import PosterImage from "@/components/movies/PosterImage";
import GenreTag from "@/components/movies/GenreTag";
import { CastList } from "@/components/movies/CastChip";
import MovieGrid from "@/components/movies/MovieGrid";

interface MovieDetailPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({
    params,
}: MovieDetailPageProps): Promise<Metadata> {
    const { slug } = await params;
    const movie = await getMovieBySlug(slug);

    if (!movie) {
        return { title: "Movie Not Found — CineDex" };
    }

    return {
        title: `${movie.title} (${movie.releaseYear}) — CineDex`,
        description: movie.synopsis
            ? movie.synopsis.slice(0, 160)
            : `${movie.title} — directed by ${movie.director}`,
        openGraph: {
            title: `${movie.title} (${movie.releaseYear})`,
            description: movie.synopsis?.slice(0, 160),
            type: "video.movie",
        },
    };
}

async function SimilarMovies({ movie }: { movie: NonNullable<Awaited<ReturnType<typeof getMovieBySlug>>> }) {
    if (!movie.genres || movie.genres.length === 0) return null;

    try {
        const primaryGenre = movie.genres[0];
        const res = await getMovies({ genre: primaryGenre.slug, pageSize: 4 });
        const similar = res.data.filter((m) => m.id !== movie.id).slice(0, 4);

        if (similar.length === 0) return null;

        return (
            <section className="mt-16">
                <h2 className="text-2xl font-bold text-text-primary mb-6">
                    More in <span className="text-accent">{primaryGenre.name}</span>
                </h2>
                <MovieGrid movies={similar} />
            </section>
        );
    } catch {
        return null;
    }
}

export default async function MovieDetailPage({
    params,
}: MovieDetailPageProps) {
    const { slug } = await params;
    const movie = await getMovieBySlug(slug);

    if (!movie) {
        notFound();
    }

    // Build breadcrumb
    const breadcrumbItems = [
        { label: "Home", href: "/" },
        ...(movie.genres && movie.genres.length > 0
            ? [
                {
                    label: movie.genres[0].name,
                    href: `/?genre=${movie.genres[0].slug}`,
                },
            ]
            : []),
        { label: movie.title },
    ];

    return (
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <Breadcrumb items={breadcrumbItems} />

            {/* Two-column layout on desktop, single on mobile */}
            <div className="mt-6 flex flex-col lg:flex-row gap-8 lg:gap-12">
                {/* Left column: Poster + key facts (sticky on desktop) */}
                <div className="lg:sticky lg:top-24 lg:self-start w-full lg:w-80 flex-shrink-0">
                    {/* Poster */}
                    <div className="relative aspect-[2/3] w-full max-w-sm mx-auto lg:mx-0 overflow-hidden rounded-xl border border-border">
                        <PosterImage
                            movie={movie}
                            fill
                            priority
                            className="object-cover"
                            sizes="(max-width: 1024px) 80vw, 320px"
                        />
                    </div>

                    {/* Key facts below poster */}
                    <div className="mt-6 space-y-4">
                        <h1 className="text-2xl lg:text-3xl font-bold text-text-primary">
                            {movie.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-3 text-sm text-text-secondary">
                            <span className="font-medium">{movie.releaseYear}</span>
                            {movie.runtime > 0 && (
                                <>
                                    <span className="text-border">•</span>
                                    <span>{movie.runtime} min</span>
                                </>
                            )}
                            {movie.director && (
                                <>
                                    <span className="text-border">•</span>
                                    <span>Dir. {movie.director}</span>
                                </>
                            )}
                        </div>

                        {/* Genre tags */}
                        {movie.genres && movie.genres.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {movie.genres.map((genre) => (
                                    <GenreTag
                                        key={genre.id}
                                        genre={genre}
                                        size="md"
                                        variant="outlined"
                                        asLink
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right column: Synopsis + Cast (scrollable) */}
                <div className="flex-1 min-w-0">
                    {/* Synopsis */}
                    <section>
                        <h2 className="text-xl font-semibold text-text-primary mb-4">
                            Synopsis
                        </h2>
                        <p className="text-text-secondary leading-relaxed whitespace-pre-line">
                            {movie.synopsis || "No synopsis available."}
                        </p>
                    </section>

                    {/* Cast */}
                    <section className="mt-10">
                        <h2 className="text-xl font-semibold text-text-primary mb-4">
                            Cast
                        </h2>
                        <CastList castMembers={movie.castMembers} cast={movie.cast || []} initialCount={6} />
                    </section>
                </div>
            </div>

            {/* Similar movies */}
            <Suspense fallback={null}>
                <SimilarMovies movie={movie} />
            </Suspense>
        </div>
    );
}
