"use client";

import type { PlanHubTab } from "./types";

type PlanTabsProps = {
    activeTab: PlanHubTab;
    ownedLabel: string;
    savedLabel: string;
    onChange: (tab: PlanHubTab) => void;
};

export function PlanTabs({
    activeTab,
    ownedLabel,
    savedLabel,
    onChange,
}: Readonly<PlanTabsProps>) {
    return (
        <div className="inline-flex rounded-full bg-brand-50 p-1">
            <button
                type="button"
                onClick={() => onChange("owned")}
                className={`rounded-full px-4 py-2 text-sm font-semibold ${
                    activeTab === "owned"
                        ? "bg-accent-500 text-ink-inverse"
                        : "text-ink-body hover:text-ink-strong"
                }`}
            >
                {ownedLabel}
            </button>
            <button
                type="button"
                onClick={() => onChange("saved")}
                className={`rounded-full px-4 py-2 text-sm font-semibold ${
                    activeTab === "saved"
                        ? "bg-accent-500 text-ink-inverse"
                        : "text-ink-body hover:text-ink-strong"
                }`}
            >
                {savedLabel}
            </button>
        </div>
    );
}
