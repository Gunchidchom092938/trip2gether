import { Heart, MessageCircle, Repeat2 } from "lucide-react";

import type { ProfilePost } from "./types";

type ProfileFeedCardProps = {
    post: ProfilePost;
    viewTripLabel: string;
};

export function ProfileFeedCard({
    post,
    viewTripLabel,
}: Readonly<ProfileFeedCardProps>) {
    return (
        <article className="rounded-[2rem] border border-line-subtle bg-surface-panel p-5 shadow-[0_24px_50px_rgba(36,24,21,0.08)]">
            <div className="flex items-start gap-3">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-700 text-sm font-semibold text-ink-inverse">
                    {post.author.slice(0, 1).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                            <p className="font-semibold text-ink-strong">
                                {post.author}
                            </p>
                            <p className="text-sm text-ink-body">
                                @{post.handle} · {post.timestamp}
                            </p>
                        </div>
                        <button
                            type="button"
                            className="rounded-full border border-line-subtle px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-ink-body hover:border-brand-300 hover:text-ink-strong"
                        >
                            {viewTripLabel}
                        </button>
                    </div>
                    <div className="mt-4">
                        <p className="text-xl font-semibold text-ink-strong">
                            {post.title}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-ink-body">
                            {post.summary}
                        </p>
                    </div>
                    <div
                        className={`mt-4 min-h-[220px] rounded-[1.75rem] border border-white/35 ${post.imageClassName}`}
                    />
                    <div className="mt-4 flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                            <span
                                key={tag}
                                className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                    <div className="mt-5 flex flex-wrap items-center gap-5 border-t border-line-subtle pt-4 text-sm text-ink-body">
                        <span className="inline-flex items-center gap-2">
                            <Heart className="h-4 w-4 text-highlight-strong" />
                            {post.metrics.likes}
                        </span>
                        <span className="inline-flex items-center gap-2">
                            <MessageCircle className="h-4 w-4 text-brand-700" />
                            {post.metrics.comments}
                        </span>
                        <span className="inline-flex items-center gap-2">
                            <Repeat2 className="h-4 w-4 text-accent-700" />
                            {post.metrics.shares}
                        </span>
                    </div>
                </div>
            </div>
        </article>
    );
}
