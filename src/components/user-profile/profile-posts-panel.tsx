import { Grid2x2, SlidersHorizontal } from "lucide-react";

import { ProfileComposerCard } from "@/components/profile/profile-composer-card";
import { ProfileFeedCard } from "@/components/profile/profile-feed-card";
import type { ProfilePost } from "@/components/profile/types";

type ProfilePostsPanelProps = {
    composerPrompt: string;
    composerSubPrompt: string;
    composerActions: string[];
    postsTitle: string;
    filterLabel: string;
    manageLabel: string;
    listViewLabel: string;
    gridViewLabel: string;
    viewTripLabel: string;
    posts: ProfilePost[];
};

export function ProfilePostsPanel({
    composerPrompt,
    composerSubPrompt,
    composerActions,
    postsTitle,
    filterLabel,
    manageLabel,
    listViewLabel,
    gridViewLabel,
    viewTripLabel,
    posts,
}: Readonly<ProfilePostsPanelProps>) {
    return (
        <div className="space-y-5">
            <ProfileComposerCard
                prompt={composerPrompt}
                subPrompt={composerSubPrompt}
                actions={composerActions}
            />
            <section className="rounded-[2rem] border border-line-subtle bg-surface-panel p-5 shadow-[0_22px_50px_rgba(36,24,21,0.08)]">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-2xl font-semibold tracking-tight text-ink-strong">
                        {postsTitle}
                    </p>
                    <div className="flex flex-wrap gap-2">
                        <button
                            type="button"
                            className="inline-flex items-center gap-2 rounded-2xl bg-surface-raised px-4 py-3 text-sm font-semibold text-ink-strong hover:bg-brand-50"
                        >
                            <SlidersHorizontal className="h-4 w-4" />
                            {filterLabel}
                        </button>
                        <button
                            type="button"
                            className="inline-flex items-center gap-2 rounded-2xl bg-surface-raised px-4 py-3 text-sm font-semibold text-ink-strong hover:bg-brand-50"
                        >
                            <Grid2x2 className="h-4 w-4" />
                            {manageLabel}
                        </button>
                    </div>
                </div>
                <div className="mt-4 flex gap-3 border-b border-line-subtle pb-3 text-sm font-semibold">
                    <button
                        type="button"
                        className="rounded-full bg-brand-50 px-4 py-2 text-brand-700"
                    >
                        {listViewLabel}
                    </button>
                    <button
                        type="button"
                        className="rounded-full px-4 py-2 text-ink-body hover:bg-brand-50 hover:text-ink-strong"
                    >
                        {gridViewLabel}
                    </button>
                </div>
            </section>
            <div className="space-y-5">
                {posts.map((post) => (
                    <ProfileFeedCard
                        key={`${post.handle}-${post.title}`}
                        post={post}
                        viewTripLabel={viewTripLabel}
                    />
                ))}
            </div>
        </div>
    );
}
