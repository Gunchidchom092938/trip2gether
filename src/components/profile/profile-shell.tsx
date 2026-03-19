import { ProfileComposerCard } from "./profile-composer-card";
import { ProfileFeedCard } from "./profile-feed-card";
import { ProfileLeftRail } from "./profile-left-rail";
import { ProfileRightRail } from "./profile-right-rail";
import type {
    ProfileContact,
    ProfileHighlight,
    ProfilePost,
    ProfileShortcut,
    ProfileStat,
} from "./types";

type ProfileShellProps = {
    displayName: string;
    username: string;
    bio: string;
    pageTitle: string;
    pageDescription: string;
    createTripLabel: string;
    profileSummaryLabel: string;
    highlightsLabel: string;
    viewTripLabel: string;
    sponsorLabel: string;
    sponsorTitle: string;
    sponsorDescription: string;
    contactsTitle: string;
    plannerTipTitle: string;
    plannerTipDescription: string;
    composerPrompt: string;
    composerSubPrompt: string;
    composerActions: string[];
    stats: ProfileStat[];
    shortcuts: ProfileShortcut[];
    highlights: ProfileHighlight[];
    posts: ProfilePost[];
    contacts: ProfileContact[];
};

export function ProfileShell({
    displayName,
    username,
    bio,
    pageTitle,
    pageDescription,
    createTripLabel,
    profileSummaryLabel,
    highlightsLabel,
    viewTripLabel,
    sponsorLabel,
    sponsorTitle,
    sponsorDescription,
    contactsTitle,
    plannerTipTitle,
    plannerTipDescription,
    composerPrompt,
    composerSubPrompt,
    composerActions,
    stats,
    shortcuts,
    highlights,
    posts,
    contacts,
}: Readonly<ProfileShellProps>) {
    return (
        <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(255,229,184,0.38),transparent_24%),linear-gradient(180deg,#f6efe4,#fff8ed_36%,#f6efe4)] pb-12">
            <section className="mx-auto max-w-7xl px-3 pt-6 sm:px-4 lg:px-6">
                <div className="overflow-hidden rounded-[2.4rem] border border-line-subtle bg-[linear-gradient(135deg,rgba(255,248,237,0.94),rgba(255,255,255,0.78))] p-6 shadow-[0_28px_80px_rgba(36,24,21,0.09)] sm:p-8">
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-700">
                        @{username}
                    </p>
                    <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink-strong sm:text-4xl">
                        {pageTitle}
                    </h1>
                    <p className="mt-4 max-w-3xl text-base leading-7 text-ink-body">
                        {pageDescription}
                    </p>
                </div>
            </section>

            <section className="mx-auto mt-6 grid max-w-7xl gap-6 px-3 sm:px-4 lg:grid-cols-[280px_minmax(0,1fr)_320px] lg:px-6">
                <ProfileLeftRail
                    displayName={displayName}
                    username={username}
                    bio={bio}
                    stats={stats}
                    shortcuts={shortcuts}
                    highlights={highlights}
                    createTripLabel={createTripLabel}
                    profileSummaryLabel={profileSummaryLabel}
                    highlightsLabel={highlightsLabel}
                />

                <div className="space-y-5">
                    <ProfileComposerCard
                        prompt={composerPrompt}
                        subPrompt={composerSubPrompt}
                        actions={composerActions}
                    />
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

                <ProfileRightRail
                    title={sponsorLabel}
                    sponsorTitle={sponsorTitle}
                    sponsorDescription={sponsorDescription}
                    contactsTitle={contactsTitle}
                    contacts={contacts}
                    plannerTipTitle={plannerTipTitle}
                    plannerTipDescription={plannerTipDescription}
                />
            </section>
        </main>
    );
}
