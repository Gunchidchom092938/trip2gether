export function TripSummaryCard({
    t,
    tripName,
    owner,
    startDate,
    endDate,
    budget,
    totalStops,
    completedTasks,
    totalTasks,
    totalCost,
    remainingBudget,
}: Readonly<{
    t: (key: string) => string;
    tripName: string;
    owner: string;
    startDate: string;
    endDate: string;
    budget: number;
    totalStops: number;
    completedTasks: number;
    totalTasks: number;
    totalCost: number;
    remainingBudget: number;
}>) {
    return (
        <>
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-surface-soft p-4">
                    <p className="text-sm text-ink-body">{t("totalStops")}</p>
                    <p className="mt-2 text-3xl font-semibold">{totalStops}</p>
                </div>
                <div className="rounded-3xl bg-surface-soft p-4">
                    <p className="text-sm text-ink-body">
                        {t("checklistProgress")}
                    </p>
                    <p className="mt-2 text-3xl font-semibold">
                        {completedTasks}/{totalTasks}
                    </p>
                </div>
                <div className="rounded-3xl bg-surface-soft p-4">
                    <p className="text-sm text-ink-body">{t("totalCost")}</p>
                    <p className="mt-2 text-3xl font-semibold">
                        {totalCost.toLocaleString()}
                    </p>
                </div>
                <div className="rounded-3xl bg-surface-soft p-4">
                    <p className="text-sm text-ink-body">
                        {t("remainingBudget")}
                    </p>
                    <p
                        className={`mt-2 text-3xl font-semibold ${
                            remainingBudget < 0 ? "text-highlight-strong" : ""
                        }`}
                    >
                        {remainingBudget.toLocaleString()}
                    </p>
                </div>
            </div>

            <div className="mt-6 rounded-3xl border border-line-subtle bg-surface-soft p-4 text-sm leading-7 text-ink-body">
                <p>
                    <span className="font-semibold text-ink-strong">
                        {t("tripName")}:
                    </span>{" "}
                    {tripName}
                </p>
                <p>
                    <span className="font-semibold text-ink-strong">
                        {t("owner")}:
                    </span>{" "}
                    {owner}
                </p>
                <p>
                    <span className="font-semibold text-ink-strong">
                        {t("startDate")}:
                    </span>{" "}
                    {startDate}
                </p>
                <p>
                    <span className="font-semibold text-ink-strong">
                        {t("endDate")}:
                    </span>{" "}
                    {endDate}
                </p>
                <p>
                    <span className="font-semibold text-ink-strong">
                        {t("budget")}:
                    </span>{" "}
                    {budget.toLocaleString()} {t("budgetUnit")}
                </p>
            </div>
        </>
    );
}
