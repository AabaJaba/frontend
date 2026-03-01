import Image from "next/image";
import type { CastRole } from "@/lib/types";
import { getStrapiMediaUrl } from "@/lib/api";

interface CastCardProps {
    name: string;
    character?: string;
    photoUrl?: string | null;
}

function CastCard({ name, character, photoUrl }: CastCardProps) {
    return (
        <div className="flex flex-col items-center text-center group">
            {/* Photo */}
            <div className="relative aspect-square w-full max-w-[96px] sm:max-w-[112px] overflow-hidden rounded-full bg-bg-surface-2 border-2 border-border group-hover:border-accent/60 transition-colors mb-3">
                {photoUrl ? (
                    <Image
                        src={photoUrl}
                        alt={name}
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
                {name}
            </span>
            {/* Character */}
            {character && (
                <span className="text-xs text-text-secondary mt-0.5 leading-tight">
                    {character}
                </span>
            )}
        </div>
    );
}

interface CastListProps {
    castRoles?: CastRole[];
    initialCount?: number;
}

export function CastList({ castRoles, initialCount = 6 }: CastListProps) {
    if (!castRoles || castRoles.length === 0) {
        return (
            <p className="text-sm text-text-secondary italic">
                Cast information not available
            </p>
        );
    }

    return (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
            {castRoles.slice(0, initialCount).map((role) => {
                const member = role.castMember;
                const photoUrl = member?.photo?.url
                    ? getStrapiMediaUrl(member.photo.url)
                    : null;

                return (
                    <CastCard
                        key={role.id}
                        name={member?.name ?? "Unknown"}
                        character={role.character}
                        photoUrl={photoUrl}
                    />
                );
            })}
        </div>
    );
}

export default CastCard;
