/* ======================
   Strapi API Client
   ====================== */

import type {
    MovieListResponse,
    SingleMovieResponse,
    GenreListResponse,
    Movie,
    Genre,
} from "./types";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

/**
 * Generic fetch wrapper for Strapi API
 */
async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${STRAPI_URL}/api${endpoint}`;

    try {
        const res = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
            ...options,
        });

        if (!res.ok) {
            const errorText = await res.text().catch(() => "");
            console.error(`Strapi API error: ${res.status} ${res.statusText} — ${url}`, errorText);
            throw new Error(`Strapi API error: ${res.status} ${res.statusText} — ${url}`);
        }

        return res.json();
    } catch (error) {
        console.error(`Failed to fetch from Strapi: ${url}`, error);
        throw error;
    }
}

/**
 * Get paginated list of movies, optionally filtered by genre and/or search query.
 */
export async function getMovies(params?: {
    page?: number;
    pageSize?: number;
    genre?: string;
    search?: string;
    sort?: string;
}): Promise<MovieListResponse> {
    const searchParams = new URLSearchParams();

    // Populate relations (Strapi v5 uses * or array syntax, not comma-separated)
    searchParams.set("populate", "*");

    // Pagination
    searchParams.set("pagination[page]", String(params?.page || 1));
    searchParams.set("pagination[pageSize]", String(params?.pageSize || 20));

    // Sort
    searchParams.set("sort", params?.sort || "title:asc");

    // Genre filter
    if (params?.genre) {
        searchParams.set("filters[genres][slug][$eq]", params.genre);
    }

    // Title search (case-insensitive contains)
    if (params?.search) {
        searchParams.set("filters[title][$containsi]", params.search);
    }

    return fetchAPI<MovieListResponse>(`/movies?${searchParams.toString()}`);
}

/**
 * Get a single movie by slug.
 */
export async function getMovieBySlug(slug: string): Promise<Movie | null> {
    const searchParams = new URLSearchParams();
    // Use object syntax with explicit fields to avoid poster.related circular error
    searchParams.set("populate[poster][fields][0]", "url");
    searchParams.set("populate[poster][fields][1]", "width");
    searchParams.set("populate[poster][fields][2]", "height");
    searchParams.set("populate[poster][fields][3]", "alternativeText");
    searchParams.set("populate[genres][fields][0]", "name");
    searchParams.set("populate[genres][fields][1]", "slug");
    searchParams.set("populate[castMembers][populate][photo][fields][0]", "url");
    searchParams.set("populate[castMembers][populate][photo][fields][1]", "width");
    searchParams.set("populate[castMembers][populate][photo][fields][2]", "height");
    searchParams.set("filters[slug][$eq]", slug);

    const response = await fetchAPI<MovieListResponse>(
        `/movies?${searchParams.toString()}`
    );

    return response.data?.[0] || null;
}

/**
 * Get a single movie by document ID.
 */
export async function getMovie(documentId: string): Promise<Movie> {
    const searchParams = new URLSearchParams();
    searchParams.set("populate[poster][fields][0]", "url");
    searchParams.set("populate[poster][fields][1]", "width");
    searchParams.set("populate[poster][fields][2]", "height");
    searchParams.set("populate[poster][fields][3]", "alternativeText");
    searchParams.set("populate[genres][fields][0]", "name");
    searchParams.set("populate[genres][fields][1]", "slug");
    searchParams.set("populate[castMembers][populate][photo][fields][0]", "url");
    searchParams.set("populate[castMembers][populate][photo][fields][1]", "width");
    searchParams.set("populate[castMembers][populate][photo][fields][2]", "height");

    const response = await fetchAPI<SingleMovieResponse>(
        `/movies/${documentId}?${searchParams.toString()}`
    );

    return response.data;
}

/**
 * Get all genres.
 */
export async function getGenres(): Promise<Genre[]> {
    const response = await fetchAPI<GenreListResponse>(
        `/genres?sort=name:asc&pagination[pageSize]=100`
    );

    return response.data;
}

/**
 * Build the full URL for a Strapi media file.
 */
export function getStrapiMediaUrl(url: string | undefined): string {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    return `${STRAPI_URL}${url}`;
}
