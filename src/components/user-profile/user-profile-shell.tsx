import type { ProfilePost } from "@/components/profile/types";

import { ProfileAboutCard } from "./profile-about-card";
import { ProfileCover } from "./profile-cover";
import { ProfileHeader } from "./profile-header";
import { ProfilePostsPanel } from "./profile-posts-panel";

type AboutItem = {
    icon: "location" | "home" | "birthday" | "work" | "school";
    text: string;
};

type UserProfileShellProps = {
    displayName: string;
    username: string;
    coverLabel: string;
    headline: string;
    location: string;
    company: string;
    university: string;
    tabs: string[];
    activeTab: string;
    addStoryLabel: string;
    editProfileLabel: string;
    moreLabel: string;
    aboutTitle: string;
    aboutItems: AboutItem[];
    workTitle: string;
    workDescription: string;
    educationTitle: string;
    educationDescription: string;
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

export function UserProfileShell({
    displayName,
    username,
    coverLabel,
    headline,
    location,
    company,
    university,
    tabs,
    activeTab,
    addStoryLabel,
    editProfileLabel,
    moreLabel,
    aboutTitle,
    aboutItems,
    workTitle,
    workDescription,
    educationTitle,
    educationDescription,
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
}: Readonly<UserProfileShellProps>) {
    return (
        <main className="min-h-screen bg-[linear-gradient(180deg,#f3ecdf,#f6efe4_16%,#efe5d5_16%,#f6efe4_54%)] pb-12">
            <section className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6">
                <ProfileCover coverLabel={coverLabel} displayName={displayName} />
                <ProfileHeader
                    displayName={displayName}
                    username={username}
                    headline={headline}
                    location={location}
                    company={company}
                    university={university}
                    tabs={tabs}
                    activeTab={activeTab}
                    addStoryLabel={addStoryLabel}
                    editProfileLabel={editProfileLabel}
                    moreLabel={moreLabel}
                />
            </section>

            <section className="mx-auto mt-6 grid max-w-7xl gap-6 px-3 sm:px-4 lg:grid-cols-[340px_minmax(0,1fr)] lg:px-6">
                <ProfileAboutCard
                    title={aboutTitle}
                    items={aboutItems}
                    workTitle={workTitle}
                    workDescription={workDescription}
                    educationTitle={educationTitle}
                    educationDescription={educationDescription}
                />
                <ProfilePostsPanel
                    composerPrompt={composerPrompt}
                    composerSubPrompt={composerSubPrompt}
                    composerActions={composerActions}
                    postsTitle={postsTitle}
                    filterLabel={filterLabel}
                    manageLabel={manageLabel}
                    listViewLabel={listViewLabel}
                    gridViewLabel={gridViewLabel}
                    viewTripLabel={viewTripLabel}
                    posts={posts}
                />
            </section>
        </main>
    );
}
