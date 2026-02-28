"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef, Suspense } from "react";

function SearchInput() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [query, setQuery] = useState(searchParams.get("q") || "");
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const debounceRef = useRef<any>(null);

    // Keyboard shortcut: "/" to focus search
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "/" && document.activeElement !== inputRef.current) {
                e.preventDefault();
                inputRef.current?.focus();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    const handleSearch = (value: string) => {
        setQuery(value);
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            if (value.trim()) {
                router.push(`/search?q=${encodeURIComponent(value.trim())}`);
            }
        }, 300);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query.trim())}`);
        }
    };

    const clearSearch = () => {
        setQuery("");
        inputRef.current?.focus();
    };

    return (
        <form onSubmit={handleSubmit} className="relative flex-1 max-w-xl">
            <div
                className={`flex items-center rounded-lg transition-all duration-200 ${isFocused
                    ? "bg-bg-surface-2 ring-1 ring-accent"
                    : "bg-bg-surface-1 hover:bg-bg-surface-2"
                    }`}
            >
                {/* Search icon */}
                <svg
                    className="ml-3 h-4 w-4 text-text-secondary flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => handleSearch(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Search movies..."
                    className="w-full bg-transparent px-3 py-2.5 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none"
                    aria-label="Search movies"
                    id="search-input"
                />
                {query && (
                    <button
                        type="button"
                        onClick={clearSearch}
                        className="mr-2 rounded p-1 text-text-secondary hover:text-text-primary transition-colors"
                        aria-label="Clear search"
                    >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>
        </form>
    );
}

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 border-b border-border bg-bg-base/90 backdrop-blur-xl">
            <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xl font-bold text-text-primary">
                        Cine<span className="text-accent">Dex</span>
                    </span>
                </Link>

                {/* Search bar — wide, next to logo (desktop) */}
                <div className="hidden sm:flex flex-1">
                    <Suspense fallback={null}>
                        <SearchInput />
                    </Suspense>
                </div>

                {/* Mobile hamburger */}
                <button
                    className="sm:hidden ml-auto rounded-lg p-2 text-text-secondary hover:text-text-primary hover:bg-bg-surface-1 transition-colors"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                    aria-expanded={isMobileMenuOpen}
                >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {isMobileMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile menu */}
            {isMobileMenuOpen && (
                <div className="sm:hidden border-t border-border bg-bg-base/95 backdrop-blur-xl">
                    <div className="px-4 py-3">
                        <Suspense fallback={null}>
                            <SearchInput />
                        </Suspense>
                    </div>
                </div>
            )}
        </header>
    );
}
