import { CalendarRange, MapPinned, UserRound } from "lucide-react";

import { Link } from "@/i18n/navigation";
import type { PlanCardItem } from "./types";

type PlanCardProps = {
    item: PlanCardItem;
    openLabel: string;
};

const statusClasses = {
    draft: "bg-brand-50 text-brand-700",
    planned: "bg-sky-100 text-sky-800",
    traveling: "bg-emerald-100 text-emerald-800",
    finished: "bg-stone-200 text-stone-700",
    saved: "bg-sky-100 text-sky-800",
} as const;

export function PlanCard({ item, openLabel }: Readonly<PlanCardProps>) {
    return (
        <article className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-line-subtle bg-surface-panel shadow-[0_22px_50px_rgba(36,24,21,0.08)]">
            <div
                className="h-44 bg-cover bg-center"
                style={{ backgroundImage: `url(${item.coverImage})` }}
            />
            <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p className="text-xl font-semibold text-ink-strong">
                            {item.title}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-3 text-sm text-ink-body">
                            <span className="inline-flex items-center gap-2">
                                <MapPinned className="h-4 w-4 text-brand-700" />
                                {item.destination}
                            </span>
                            <span className="inline-flex items-center gap-2">
                                <CalendarRange className="h-4 w-4 text-brand-700" />
                                {item.dateRange}
                            </span>
                            <span className="inline-flex items-center gap-2">
                                <UserRound className="h-4 w-4 text-brand-700" />
                                {item.owner}
                            </span>
                        </div>
                    </div>
                    <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] ${statusClasses[item.status]}`}
                    >
                        {item.status}
                    </span>
                </div>
                <p className="mt-4 text-sm leading-6 text-ink-body">
                    {item.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full bg-surface-raised px-3 py-1 text-xs font-semibold text-ink-body"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
                <div className="mt-auto pt-5">
                    <Link
                        href={`/plan/${item.id}`}
                        className="inline-flex rounded-2xl bg-accent-500 px-4 py-3 text-sm font-semibold text-ink-inverse hover:bg-accent-700"
                    >
                        {openLabel}
                    </Link>
                </div>
            </div>
        </article>
    );
}
