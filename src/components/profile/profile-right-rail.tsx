import { Compass, MessageSquareText, Sparkle } from "lucide-react";

import type { ProfileContact } from "./types";

type ProfileRightRailProps = {
    title: string;
    sponsorTitle: string;
    sponsorDescription: string;
    contactsTitle: string;
    contacts: ProfileContact[];
    plannerTipTitle: string;
    plannerTipDescription: string;
};

export function ProfileRightRail({
    title,
    sponsorTitle,
    sponsorDescription,
    contactsTitle,
    contacts,
    plannerTipTitle,
    plannerTipDescription,
}: Readonly<ProfileRightRailProps>) {
    return (
        <aside className="space-y-5 lg:sticky lg:top-24">
            <section className="rounded-[2rem] border border-line-subtle bg-surface-panel p-5 shadow-[0_20px_40px_rgba(36,24,21,0.06)]">
                <div className="rounded-[1.75rem] bg-[linear-gradient(135deg,rgba(220,155,28,0.16),rgba(255,250,242,1),rgba(190,52,85,0.12))] p-5">
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">
                        {title}
                    </p>
                    <p className="mt-4 text-2xl font-semibold text-ink-strong">
                        {sponsorTitle}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-ink-body">
                        {sponsorDescription}
                    </p>
                </div>
            </section>

            <section className="rounded-[2rem] border border-line-subtle bg-surface-panel p-5 shadow-[0_20px_40px_rgba(36,24,21,0.06)]">
                <div className="flex items-center gap-2">
                    <MessageSquareText className="h-5 w-5 text-brand-700" />
                    <p className="text-base font-semibold text-ink-strong">
                        {contactsTitle}
                    </p>
                </div>
                <div className="mt-4 space-y-3">
                    {contacts.map((contact) => (
                        <div
                            key={contact.name}
                            className="flex items-center gap-3 rounded-2xl bg-surface-raised px-4 py-3"
                        >
                            <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-100 text-sm font-semibold text-brand-900">
                                {contact.name.slice(0, 1).toUpperCase()}
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-ink-strong">
                                    {contact.name}
                                </p>
                                <p className="text-sm text-ink-body">
                                    {contact.status}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="rounded-[2rem] border border-line-subtle bg-surface-panel p-5 shadow-[0_20px_40px_rgba(36,24,21,0.06)]">
                <div className="flex items-start gap-3">
                    <div className="rounded-2xl bg-brand-50 p-3 text-brand-700">
                        <Sparkle className="h-5 w-5" />
                    </div>
                    <div>
                        <p className="font-semibold text-ink-strong">
                            {plannerTipTitle}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-ink-body">
                            {plannerTipDescription}
                        </p>
                        <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-700">
                            <Compass className="h-4 w-4" />
                            Trip2Gather
                        </div>
                    </div>
                </div>
            </section>
        </aside>
    );
}
