/* ======================
   CineDex TypeScript Types
   ====================== */

export interface StrapiImage {
    id: number;
    url: string;
    alternativeText: string | null;
    width: number;
    height: number;
    formats?: {
        thumbnail?: { url: string; width: number; height: number };
        small?: { url: string; width: number; height: number };
        medium?: { url: string; width: number; height: number };
        large?: { url: string; width: number; height: number };
    };
}

export interface Genre {
    id: number;
    documentId: string;
    name: string;
    slug: string;
}

export interface CastMember {
    id: number;
    documentId: string;
    name: string;
    slug: string;
    photo: StrapiImage | null;
}

export interface Movie {
    id: number;
    documentId: string;
    title: string;
    synopsis: string;
    releaseYear: number;
    runtime: number;
    poster: StrapiImage | null;
    director: string;
    cast: string[];              // legacy JSON field
    castMembers: CastMember[];   // new relation with photos
    slug: string;
    genres: Genre[];
}

export interface StrapiPagination {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
}

export interface MovieListResponse {
    data: Movie[];
    meta: {
        pagination: StrapiPagination;
    };
}

export interface GenreListResponse {
    data: Genre[];
    meta: {
        pagination: StrapiPagination;
    };
}

export interface SingleMovieResponse {
    data: Movie;
    meta: object;
}
