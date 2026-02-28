import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t border-border bg-bg-base">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
                    <Link href="/" className="text-lg font-bold text-text-primary">
                        Cine<span className="text-accent">Dex</span>
                    </Link>
                    <p className="text-sm text-text-secondary">
                        A clean, fast film discovery tool. No account needed.
                    </p>
                    <p className="text-xs text-text-secondary">
                        &copy; {new Date().getFullYear()} CineDex
                    </p>
                </div>
            </div>
        </footer>
    );
}
