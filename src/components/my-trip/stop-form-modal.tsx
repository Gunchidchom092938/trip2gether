"use client";

import { ImagePlus, Link2, Trash2 } from "lucide-react";
import { type UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import type { DraftStop } from "./types";

export type StopFormValues = {
    stopTitle: string;
    stopStartTime: string;
    stopEndTime: string;
    stopCost: string;
    stopImage: string;
    stopNote: string;
    linkLabel: string;
    linkUrl: string;
};

function formatTimeInput(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 4);

    if (digits.length <= 2) return digits;

    return `${digits.slice(0, 2)}:${digits.slice(2)}`;
}

export function StopFormModal({
    t,
    open,
    onOpenChange,
    form,
    mode,
    stopDraft,
    onStopDraftChange,
    onLinkDraftChange,
    onAddLink,
    onRemoveDraftLink,
    onSubmit,
}: Readonly<{
    t: (key: string, values?: Record<string, string | number>) => string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    form: UseFormReturn<StopFormValues>;
    mode: "add" | "edit";
    stopDraft: DraftStop;
    onStopDraftChange: (patch: Partial<DraftStop>) => void;
    onLinkDraftChange: (patch: { label?: string; url?: string }) => void;
    onAddLink: () => void;
    onRemoveDraftLink: (linkId: string) => void;
    onSubmit: () => void;
}>) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="flex max-h-[92dvh] w-[min(96vw,720px)] flex-col overflow-hidden rounded-[1.5rem] p-0 sm:max-h-[88dvh] sm:w-[min(94vw,720px)] sm:rounded-[2rem]">
                <DialogHeader>
                    <DialogTitle className="px-4 pt-4 text-xl sm:px-6 sm:pt-6 sm:text-2xl">
                        {mode === "edit" ? t("editStop") : t("addStop")}
                    </DialogTitle>
                    <DialogDescription className="px-4 pb-4 sm:px-6 sm:pb-0">
                        {t("dayDescription")}
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <div className="flex-1 overflow-y-auto px-4 pb-4 sm:px-6 sm:pb-6">
                        <div className="grid gap-4 md:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="stopTitle"
                                render={({ field }) => (
                                    <FormItem className="md:col-span-2">
                                        <FormLabel className="text-sm font-medium text-ink-body">
                                            {t("stopTitle")}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder={t(
                                                    "stopTitlePlaceholder",
                                                )}
                                                onChange={(event) => {
                                                    field.onChange(event);
                                                    onStopDraftChange({
                                                        title: event.target.value,
                                                    });
                                                }}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="stopStartTime"
                                render={({ field }) => (
                                    <FormItem className="min-w-0">
                                        <FormLabel className="text-sm font-medium text-ink-body">
                                            {t("stopStartTime")}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="text"
                                                inputMode="numeric"
                                                placeholder="09:00"
                                                className="min-w-0 w-full font-mono"
                                                onChange={(event) => {
                                                    const nextValue =
                                                        formatTimeInput(
                                                            event.target.value,
                                                        );

                                                    field.onChange(nextValue);
                                                    onStopDraftChange({
                                                        startTime:
                                                            nextValue,
                                                    });
                                                }}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="stopEndTime"
                                render={({ field }) => (
                                    <FormItem className="min-w-0">
                                        <FormLabel className="text-sm font-medium text-ink-body">
                                            {t("stopEndTime")}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="text"
                                                inputMode="numeric"
                                                placeholder="18:30"
                                                className="min-w-0 w-full font-mono"
                                                onChange={(event) => {
                                                    const nextValue =
                                                        formatTimeInput(
                                                            event.target.value,
                                                        );

                                                    field.onChange(nextValue);
                                                    onStopDraftChange({
                                                        endTime: nextValue,
                                                    });
                                                }}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="stopCost"
                                render={({ field }) => (
                                    <FormItem className="md:col-span-2">
                                        <FormLabel className="text-sm font-medium text-ink-body">
                                            {t("stopCost")}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="number"
                                                onChange={(event) => {
                                                    field.onChange(event);
                                                    onStopDraftChange({
                                                        cost: event.target.value,
                                                    });
                                                }}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="stopImage"
                                render={({ field }) => (
                                    <FormItem className="md:col-span-2">
                                        <FormLabel className="flex items-center gap-2 text-sm font-medium text-ink-body">
                                            <ImagePlus className="h-4 w-4" />
                                            {t("stopImage")}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder={t(
                                                    "stopImagePlaceholder",
                                                )}
                                                onChange={(event) => {
                                                    field.onChange(event);
                                                    onStopDraftChange({
                                                        image: event.target.value,
                                                    });
                                                }}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="stopNote"
                                render={({ field }) => (
                                    <FormItem className="md:col-span-2">
                                        <FormLabel className="text-sm font-medium text-ink-body">
                                            {t("stopNote")}
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                placeholder={t(
                                                    "stopNotePlaceholder",
                                                )}
                                                className="min-h-24 sm:min-h-28"
                                                onChange={(event) => {
                                                    field.onChange(event);
                                                    onStopDraftChange({
                                                        note: event.target.value,
                                                    });
                                                }}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="mt-5 rounded-3xl border border-line-subtle bg-surface-raised p-4">
                            <div className="grid gap-3 md:grid-cols-[0.8fr_1.2fr_auto]">
                                <FormField
                                    control={form.control}
                                    name="linkLabel"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder={t(
                                                        "linkLabelPlaceholder",
                                                    )}
                                                    onChange={(event) => {
                                                        field.onChange(event);
                                                        onLinkDraftChange({
                                                            label: event.target.value,
                                                        });
                                                    }}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="linkUrl"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder={t(
                                                        "linkUrlPlaceholder",
                                                    )}
                                                    onChange={(event) => {
                                                        field.onChange(event);
                                                        onLinkDraftChange({
                                                            url: event.target.value,
                                                        });
                                                    }}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={onAddLink}
                                    className="w-full md:w-auto"
                                >
                                    <Link2 className="mr-2 h-4 w-4" />
                                    {t("addLink")}
                                </Button>
                            </div>

                            <div className="mt-4 flex flex-wrap gap-2">
                                {stopDraft.links.length === 0 ? (
                                    <p className="text-sm text-ink-body">
                                        {t("emptyLinks")}
                                    </p>
                                ) : (
                                    stopDraft.links.map((link) => (
                                        <div
                                            key={link.id}
                                            className="flex max-w-full items-center gap-2 rounded-full border border-line-subtle bg-brand-50 px-3 py-2 text-sm text-ink-body"
                                        >
                                            <span className="font-medium text-ink-strong">
                                                {link.label}
                                            </span>
                                            <span className="max-w-24 truncate sm:max-w-32">
                                                {link.url}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    onRemoveDraftLink(link.id)
                                                }
                                                className="shrink-0 text-ink-body transition hover:text-highlight-strong"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="border-t border-line-subtle bg-surface-panel px-4 py-4 sm:px-6">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => onOpenChange(false)}
                            className="w-full sm:w-auto"
                        >
                            {t("cancel")}
                        </Button>
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => {
                                onSubmit();
                                onOpenChange(false);
                            }}
                            className="w-full sm:w-auto"
                        >
                            {mode === "edit" ? t("saveStopChanges") : t("addStop")}
                        </Button>
                    </DialogFooter>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
