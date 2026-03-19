import { MoreHorizontal, Pencil, Plus, UserRoundCheck } from "lucide-react";

type ProfileHeaderProps = {
    displayName: string;
    username: string;
    headline: string;
    location: string;
    company: string;
    university: string;
    tabs: string[];
    activeTab: string;
    addStoryLabel: string;
    editProfileLabel: string;
    moreLabel: string;
};

export function ProfileHeader({
    displayName,
    username,
    headline,
    location,
    company,
    university,
    tabs,
    activeTab,
    addStoryLabel,
    editProfileLabel,
    moreLabel,
}: Readonly<ProfileHeaderProps>) {
    return (
        <section className="relative z-30 rounded-b-[2rem] border border-line-subtle border-t-0 bg-surface-panel px-5 pb-3 pt-0 shadow-[0_22px_60px_rgba(36,24,21,0.08)]">
            <div className="flex flex-col gap-5 px-2 lg:flex-row lg:items-end lg:justify-between">
                <div className="flex gap-4">
                    <div className="-mt-10 relative z-40 inline-flex h-28 w-28 shrink-0 items-center justify-center rounded-[2rem] border-4 border-surface-panel bg-[linear-gradient(135deg,#fff4dc,#dc9b1c_52%,#6f4513)] text-4xl font-semibold text-ink-strong shadow-[0_18px_40px_rgba(36,24,21,0.22)]">
                        {displayName.slice(0, 1)}
                    </div>
                    <div className="pb-2 pt-6">
                        <h1 className="text-3xl font-semibold tracking-tight text-ink-strong">
                            {displayName}
                        </h1>
                        <p className="mt-1 text-sm text-ink-body">@{username}</p>
                        <p className="mt-2 text-sm font-medium text-ink-body">
                            {headline}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-ink-body">
                            <span>{location}</span>
                            <span>{company}</span>
                            <span>{university}</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 pb-2">
                    <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-2xl bg-brand-500 px-4 py-3 text-sm font-semibold text-ink-strong shadow-[0_14px_30px_rgba(220,155,28,0.28)] hover:bg-brand-300"
                    >
                        <Plus className="h-4 w-4" />
                        {addStoryLabel}
                    </button>
                    <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-2xl bg-surface-raised px-4 py-3 text-sm font-semibold text-ink-strong hover:bg-brand-50"
                    >
                        <Pencil className="h-4 w-4" />
                        {editProfileLabel}
                    </button>
                    <button
                        type="button"
                        className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-surface-raised text-ink-body hover:bg-brand-50"
                        aria-label={moreLabel}
                    >
                        <MoreHorizontal className="h-5 w-5" />
                    </button>
                </div>
            </div>
            <div className="mt-5 border-t border-line-subtle pt-3">
                <nav className="flex flex-wrap gap-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            type="button"
                            className={`rounded-2xl px-4 py-2 text-sm font-semibold ${
                                tab === activeTab
                                    ? "bg-accent-500 text-ink-inverse"
                                    : "text-ink-body hover:bg-brand-50 hover:text-ink-strong"
                            }`}
                        >
                            {tab === activeTab ? (
                                <span className="inline-flex items-center gap-2">
                                    <UserRoundCheck className="h-4 w-4" />
                                    {tab}
                                </span>
                            ) : (
                                tab
                            )}
                        </button>
                    ))}
                </nav>
            </div>
        </section>
    );
}
