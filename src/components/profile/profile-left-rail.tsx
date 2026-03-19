"use client";

import { BookmarkPlus, Camera, MapPinned, Users } from "lucide-react";
import { useRouter } from "@/i18n/navigation";

import type { ProfileHighlight, ProfileShortcut, ProfileStat } from "./types";

const iconMap = {
    map: MapPinned,
    bookmark: BookmarkPlus,
    users: Users,
    camera: Camera,
} as const;

type ProfileLeftRailProps = {
    displayName: string;
    username: string;
    bio: string;
    stats: ProfileStat[];
    shortcuts: ProfileShortcut[];
    highlights: ProfileHighlight[];
    createTripLabel: string;
    profileSummaryLabel: string;
    highlightsLabel: string;
};

export function ProfileLeftRail({
    displayName,
    username,
    bio,
    stats,
    shortcuts,
    highlights,
    createTripLabel,
    profileSummaryLabel,
    highlightsLabel,
}: Readonly<ProfileLeftRailProps>) {
    const router = useRouter();

    return (
        <aside className="space-y-5 lg:sticky lg:top-24">
            <section className="overflow-hidden rounded-[2rem] border border-line-subtle bg-surface-panel shadow-[0_24px_50px_rgba(36,24,21,0.08)]">
                <div className="h-28 bg-[radial-gradient(circle_at_top_left,_rgba(220,155,28,0.3),_transparent_55%),linear-gradient(135deg,#f9df9f,#f6efe4_65%,#fff8ed)]" />
                <div className="px-5 pb-5">
                    <div className="-mt-10 inline-flex h-20 w-20 items-center justify-center rounded-[1.75rem] border-4 border-surface-panel bg-accent-700 text-2xl font-semibold text-ink-inverse shadow-lg">
                        {displayName.slice(0, 1).toUpperCase()}
                    </div>
                    <div className="mt-4">
                        <p
                            className="cursor-pointer text-xl font-semibold text-ink-strong hover:underline"
                            onClick={() => router.push(`/${username}`)}
                        >
                            {displayName}
                        </p>
                        <p
                            className="cursor-pointer text-sm text-ink-body hover:underline"
                            onClick={() => router.push(`/${username}`)}
                        >
                            @{username}
                        </p>
                        <p className="mt-3 text-sm leading-6 text-ink-body">
                            {bio}
                        </p>
                    </div>
                    <div className="mt-5 grid grid-cols-3 gap-3">
                        {stats.map((stat) => (
                            <div
                                key={stat.label}
                                className="rounded-2xl bg-surface-raised px-3 py-3 text-center"
                            >
                                <p className="text-lg font-semibold text-ink-strong">
                                    {stat.value}
                                </p>
                                <p className="mt-1 text-xs text-ink-body">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>
                    <button
                        type="button"
                        className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-accent-500 px-4 py-3 text-sm font-semibold text-ink-inverse shadow-[0_16px_30px_rgba(36,24,21,0.18)] hover:bg-accent-700"
                        onClick={() => router.push("/my-trip")}
                    >
                        {createTripLabel}
                    </button>
                </div>
            </section>

            <section className="rounded-[2rem] border border-line-subtle bg-surface-panel p-5 shadow-[0_20px_40px_rgba(36,24,21,0.06)]">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">
                    {profileSummaryLabel}
                </p>
                <div className="mt-4 space-y-3">
                    {shortcuts.map((shortcut) => {
                        const Icon = iconMap[shortcut.icon];

                        return (
                            <div
                                key={shortcut.label}
                                className="flex items-start gap-3 rounded-2xl bg-surface-raised px-4 py-3"
                            >
                                <div className="rounded-2xl bg-brand-50 p-2.5 text-brand-700">
                                    <Icon className="h-4 w-4" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-ink-strong">
                                        {shortcut.label}
                                    </p>
                                    <p className="mt-1 text-sm leading-5 text-ink-body">
                                        {shortcut.detail}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            <section className="rounded-[2rem] border border-line-subtle bg-surface-panel p-5 shadow-[0_20px_40px_rgba(36,24,21,0.06)]">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">
                    {highlightsLabel}
                </p>
                <div className="mt-4 space-y-3">
                    {highlights.map((highlight) => (
                        <div
                            key={highlight.label}
                            className="flex items-center justify-between rounded-2xl bg-surface-raised px-4 py-3"
                        >
                            <span className="text-sm text-ink-body">
                                {highlight.label}
                            </span>
                            <span className="text-sm font-semibold text-ink-strong">
                                {highlight.value}
                            </span>
                        </div>
                    ))}
                </div>
            </section>
        </aside>
    );
}
