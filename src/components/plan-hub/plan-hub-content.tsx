import { Link } from "@/i18n/navigation";
import type { PlanCardItem, PlanHubTab } from "./types";
import { PlanCard } from "./plan-card";
import { PlanTabs } from "./plan-tabs";

type PlanHubContentProps = {
    title: string;
    description: string;
    activeTab: PlanHubTab;
    ownedLabel: string;
    savedLabel: string;
    createLabel: string;
    openLabel: string;
    emptyLabel: string;
    items: PlanCardItem[];
    onTabChange: (tab: PlanHubTab) => void;
};

export function PlanHubContent({
    title,
    description,
    activeTab,
    ownedLabel,
    savedLabel,
    createLabel,
    openLabel,
    emptyLabel,
    items,
    onTabChange,
}: Readonly<PlanHubContentProps>) {
    return (
        <section className="rounded-[2rem] border border-line-subtle bg-surface-panel p-5 shadow-[0_22px_50px_rgba(36,24,21,0.08)]">
            <div className="flex flex-col gap-4 border-b border-line-subtle pb-5 lg:flex-row lg:items-start lg:justify-between">
                <div>
                    <p className="text-2xl font-semibold tracking-tight text-ink-strong">
                        {title}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-ink-body">
                        {description}
                    </p>
                </div>
                <Link
                    href="/plan"
                    className="inline-flex rounded-2xl bg-brand-500 px-4 py-3 text-sm font-semibold text-ink-strong shadow-[0_14px_30px_rgba(220,155,28,0.26)] hover:bg-brand-300"
                >
                    {createLabel}
                </Link>
            </div>

            <div className="mt-5">
                <PlanTabs
                    activeTab={activeTab}
                    ownedLabel={ownedLabel}
                    savedLabel={savedLabel}
                    onChange={onTabChange}
                />
            </div>

            {items.length ? (
                <div className="mt-6 grid gap-5 xl:grid-cols-2">
                    {items.map((item) => (
                        <PlanCard
                            key={item.id}
                            item={item}
                            openLabel={openLabel}
                        />
                    ))}
                </div>
            ) : (
                <div className="mt-6 rounded-[1.75rem] bg-surface-raised px-5 py-10 text-center text-sm text-ink-body">
                    {emptyLabel}
                </div>
            )}
        </section>
    );
}
