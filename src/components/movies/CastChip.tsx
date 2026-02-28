import Image from "next/image";
import type { CastMember } from "@/lib/types";
import { getStrapiMediaUrl } from "@/lib/api";

interface CastChipProps {
    castMember: CastMember;
}

export default function CastChip({ castMember }: CastChipProps) {
    const photoUrl = castMember.photo?.url
        ? getStrapiMediaUrl(castMember.photo.url)
        : null;

    return (
        <div className="flex items-center gap-3 rounded-xl bg-bg-surface-1 border border-border px-3 py-2 hover:border-accent/50 transition-colors">
            {/* Photo */}
            <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-bg-surface-2">
                {photoUrl ? (
                    <Image
                        src={photoUrl}
                        alt={castMember.name}
                        fill
                        className="object-cover"
                        sizes="40px"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-text-secondary/50">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                        </svg>
                    </div>
                )}
            </div>
            {/* Name */}
            <span className="text-sm text-text-primary whitespace-nowrap">
                {castMember.name}
            </span>
        </div>
    );
}

interface CastListProps {
    castMembers?: CastMember[];
    cast?: string[]; // fallback for legacy JSON data
    initialCount?: number;
}

export function CastList({
    castMembers,
    cast,
    initialCount = 6,
}: CastListProps) {
    // Prefer the new castMembers relation, fallback to legacy cast JSON
    if (castMembers && castMembers.length > 0) {
        return (
            <div className="flex flex-wrap gap-3">
                {castMembers.slice(0, initialCount).map((member) => (
                    <CastChip key={member.id} castMember={member} />
                ))}
                {castMembers.length > initialCount && (
                    <span className="inline-flex items-center px-3 py-2 text-sm text-text-secondary">
                        +{castMembers.length - initialCount} more
                    </span>
                )}
            </div>
        );
    }

    // Fallback to legacy cast string array
    if (cast && cast.length > 0) {
        return (
            <div className="flex flex-wrap gap-2">
                {cast.slice(0, initialCount).map((name, index) => (
                    <span
                        key={index}
                        className="inline-flex items-center rounded-lg bg-bg-surface-1 border border-border px-3 py-1.5 text-sm text-text-primary whitespace-nowrap"
                    >
                        {name}
                    </span>
                ))}
                {cast.length > initialCount && (
                    <span className="inline-flex items-center px-3 py-1.5 text-sm text-text-secondary">
                        +{cast.length - initialCount} more
                    </span>
                )}
            </div>
        );
    }

    return (
        <p className="text-sm text-text-secondary italic">
            Cast information not available
        </p>
    );
}
