import Link from "next/link";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
    return (
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-text-secondary">
            {items.map((item, index) => (
                <span key={index} className="flex items-center gap-2">
                    {index > 0 && (
                        <svg className="h-3 w-3 text-text-secondary/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    )}
                    {item.href ? (
                        <Link href={item.href} className="hover:text-accent transition-colors">
                            {item.label}
                        </Link>
                    ) : (
                        <span className="text-text-primary font-medium">{item.label}</span>
                    )}
                </span>
            ))}
        </nav>
    );
}
