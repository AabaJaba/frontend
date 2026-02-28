import Link from "next/link";
import type { Genre } from "@/lib/types";

interface GenreTagProps {
    genre: Genre;
    size?: "sm" | "md";
    variant?: "outlined" | "filled";
    isActive?: boolean;
    onClick?: () => void;
    asLink?: boolean;
}

export default function GenreTag({
    genre,
    size = "sm",
    variant = "outlined",
    isActive = false,
    onClick,
    asLink = false,
}: GenreTagProps) {
    const baseClasses =
        "inline-flex items-center rounded-full font-medium transition-all duration-200 cursor-pointer select-none";

    const sizeClasses = {
        sm: "px-2.5 py-0.5 text-xs",
        md: "px-3 py-1 text-sm",
    };

    const variantClasses = {
        outlined: isActive
            ? "bg-accent text-bg-base border border-accent"
            : "bg-transparent text-text-secondary border border-border hover:border-accent hover:text-accent",
        filled: isActive
            ? "bg-accent text-bg-base"
            : "bg-accent-muted text-accent hover:bg-accent hover:text-bg-base",
    };

    const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]}`;

    if (asLink) {
        return (
            <Link href={`/?genre=${genre.slug}`} className={classes}>
                {genre.name}
            </Link>
        );
    }

    if (onClick) {
        return (
            <button type="button" onClick={onClick} className={classes}>
                {genre.name}
            </button>
        );
    }

    return <span className={classes}>{genre.name}</span>;
}
