"use client";

type FilterOption = {
    label: string;
    value: string;
};

type PlanFilterSidebarProps = {
    title: string;
    description: string;
    statusLabel: string;
    statusOptions: FilterOption[];
    destinationLabel: string;
    destinationOptions: FilterOption[];
    collectionLabel: string;
    collectionOptions: FilterOption[];
    activeStatus: string;
    activeDestination: string;
    activeCollection: string;
    onStatusChange: (value: string) => void;
    onDestinationChange: (value: string) => void;
    onCollectionChange: (value: string) => void;
};

function FilterGroup({
    label,
    options,
    activeValue,
    onChange,
}: Readonly<{
    label: string;
    options: FilterOption[];
    activeValue: string;
    onChange: (value: string) => void;
}>) {
    return (
        <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-700">
                {label}
            </p>
            <div className="mt-4 flex flex-wrap gap-2 md:flex-col">
                {options.map((option) => (
                    <button
                        key={option.value}
                        type="button"
                        onClick={() => onChange(option.value)}
                        className={`rounded-2xl px-4 py-3 text-left text-sm font-medium ${
                            activeValue === option.value
                                ? "bg-accent-500 text-ink-inverse"
                                : "bg-surface-raised text-ink-body hover:bg-brand-50 hover:text-ink-strong"
                        }`}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
        </div>
    );
}

export function PlanFilterSidebar({
    title,
    description,
    statusLabel,
    statusOptions,
    destinationLabel,
    destinationOptions,
    collectionLabel,
    collectionOptions,
    activeStatus,
    activeDestination,
    activeCollection,
    onStatusChange,
    onDestinationChange,
    onCollectionChange,
}: Readonly<PlanFilterSidebarProps>) {
    return (
        <aside className="rounded-[2rem] border border-line-subtle bg-surface-panel p-5 shadow-[0_22px_50px_rgba(36,24,21,0.08)]">
            <p className="text-2xl font-semibold tracking-tight text-ink-strong">
                {title}
            </p>
            <p className="mt-3 text-sm leading-6 text-ink-body">
                {description}
            </p>
            <div className="mt-6 space-y-6">
                <FilterGroup
                    label={statusLabel}
                    options={statusOptions}
                    activeValue={activeStatus}
                    onChange={onStatusChange}
                />
                <FilterGroup
                    label={destinationLabel}
                    options={destinationOptions}
                    activeValue={activeDestination}
                    onChange={onDestinationChange}
                />
                <FilterGroup
                    label={collectionLabel}
                    options={collectionOptions}
                    activeValue={activeCollection}
                    onChange={onCollectionChange}
                />
            </div>
        </aside>
    );
}
