import Image from "next/image";
import type { CastMember } from "@/lib/types";
import { getStrapiMediaUrl } from "@/lib/api";

interface CastCardProps {
    castMember: CastMember;
}

function CastCard({ castMember }: CastCardProps) {
    const photoUrl = castMember.photo?.url
        ? getStrapiMediaUrl(castMember.photo.url)
        : null;

    return (
        <div className="flex flex-col items-center text-center group">
            {/* Photo */}
            <div className="relative h-24 w-24 sm:h-28 sm:w-28 overflow-hidden rounded-full bg-bg-surface-2 border-2 border-border group-hover:border-accent/60 transition-colors mb-3">
                {photoUrl ? (
                    <Image
                        src={photoUrl}
                        alt={castMember.name}
                        fill
                        className="object-cover"
                        sizes="112px"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-text-secondary/40">
                        <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <span className="text-sm font-medium text-text-primary leading-tight">
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
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
                {castMembers.slice(0, initialCount).map((member) => (
                    <CastCard key={member.id} castMember={member} />
                ))}
            </div>
        );
    }

    // Fallback: legacy cast string array as simple cards with person icon
    if (cast && cast.length > 0) {
        return (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
                {cast.slice(0, initialCount).map((name, index) => (
                    <div key={index} className="flex flex-col items-center text-center">
                        <div className="relative h-24 w-24 sm:h-28 sm:w-28 overflow-hidden rounded-full bg-bg-surface-2 border-2 border-border mb-3">
                            <div className="flex h-full w-full items-center justify-center text-text-secondary/40">
                                <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                            </div>
                        </div>
                        <span className="text-sm font-medium text-text-primary leading-tight">
                            {name}
                        </span>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <p className="text-sm text-text-secondary italic">
            Cast information not available
        </p>
    );
}

export default CastCard;
