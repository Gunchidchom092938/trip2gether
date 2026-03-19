import type { ProfileStory } from "./types";

type ProfileStoryStripProps = {
    title: string;
    stories: ProfileStory[];
};

export function ProfileStoryStrip({
    title,
    stories,
}: Readonly<ProfileStoryStripProps>) {
    return (
        <section className="rounded-[2rem] border border-line-subtle bg-surface-panel p-4 shadow-[0_20px_40px_rgba(36,24,21,0.06)]">
            <div className="mb-4 flex items-center justify-between px-1">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">
                    {title}
                </p>
                <span className="text-sm text-ink-body">{stories.length}</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {stories.map((story) => (
                    <article
                        key={story.title}
                        className={`min-h-[180px] rounded-[1.75rem] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] ${story.accentClassName}`}
                    >
                        <div className="flex h-full flex-col justify-between">
                            <span className="inline-flex w-fit rounded-full bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-ink-strong">
                                {story.badge}
                            </span>
                            <div>
                                <p className="text-lg font-semibold text-ink-strong">
                                    {story.title}
                                </p>
                                <p className="mt-2 text-sm leading-5 text-ink-body">
                                    {story.subtitle}
                                </p>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
