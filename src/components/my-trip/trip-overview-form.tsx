import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function TripOverviewForm({
    t,
    tripName,
    owner,
    startDate,
    endDate,
    budget,
    notes,
    onTripNameChange,
    onOwnerChange,
    onStartDateChange,
    onEndDateChange,
    onBudgetChange,
    onNotesChange,
}: Readonly<{
    t: (key: string) => string;
    tripName: string;
    owner: string;
    startDate: string;
    endDate: string;
    budget: number;
    notes: string;
    onTripNameChange: (value: string) => void;
    onOwnerChange: (value: string) => void;
    onStartDateChange: (value: string) => void;
    onEndDateChange: (value: string) => void;
    onBudgetChange: (value: number) => void;
    onNotesChange: (value: string) => void;
}>) {
    return (
        <div className="grid gap-4 md:grid-cols-2">
            <label className="min-w-0 space-y-2">
                <span className="text-sm font-medium text-ink-body">
                    {t("tripName")}
                </span>
                <Input
                    value={tripName}
                    onChange={(event) => onTripNameChange(event.target.value)}
                    placeholder={t("tripNamePlaceholder")}
                />
            </label>
            <label className="min-w-0 space-y-2">
                <span className="text-sm font-medium text-ink-body">
                    {t("owner")}
                </span>
                <Input
                    value={owner}
                    onChange={(event) => onOwnerChange(event.target.value)}
                />
            </label>
            <label className="min-w-0 space-y-2">
                <span className="text-sm font-medium text-ink-body">
                    {t("startDate")}
                </span>
                <DatePicker
                    value={startDate}
                    onChange={onStartDateChange}
                    placeholder={t("startDate")}
                />
            </label>
            <label className="min-w-0 space-y-2">
                <span className="text-sm font-medium text-ink-body">
                    {t("endDate")}
                </span>
                <DatePicker
                    value={endDate}
                    onChange={onEndDateChange}
                    placeholder={t("endDate")}
                />
            </label>
            <label className="min-w-0 space-y-2">
                <span className="text-sm font-medium text-ink-body">
                    {t("budget")}
                </span>
                <Input
                    type="number"
                    value={budget}
                    onChange={(event) =>
                        onBudgetChange(Number(event.target.value) || 0)
                    }
                />
            </label>
            <label className="min-w-0 space-y-2 md:col-span-2">
                <span className="text-sm font-medium text-ink-body">
                    {t("notes")}
                </span>
                <Textarea
                    value={notes}
                    onChange={(event) => onNotesChange(event.target.value)}
                    placeholder={t("notesPlaceholder")}
                />
            </label>
        </div>
    );
}
