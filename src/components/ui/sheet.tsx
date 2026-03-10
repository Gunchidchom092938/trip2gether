"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

function Sheet({ ...props }: React.ComponentProps<typeof Dialog.Root>) {
    return <Dialog.Root data-slot="sheet" {...props} />;
}

function SheetTrigger({
    ...props
}: React.ComponentProps<typeof Dialog.Trigger>) {
    return <Dialog.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetPortal({ ...props }: React.ComponentProps<typeof Dialog.Portal>) {
    return <Dialog.Portal data-slot="sheet-portal" {...props} />;
}

function SheetClose({ ...props }: React.ComponentProps<typeof Dialog.Close>) {
    return <Dialog.Close data-slot="sheet-close" {...props} />;
}

function SheetOverlay({
    className,
    ...props
}: React.ComponentProps<typeof Dialog.Overlay>) {
    return (
        <Dialog.Overlay
            data-slot="sheet-overlay"
            className={cn(
                "fixed inset-0 z-50 bg-[rgba(36,24,21,0.24)] backdrop-blur-sm",
                className,
            )}
            {...props}
        />
    );
}

function SheetContent({
    className,
    children,
    showClose = true,
    ...props
}: React.ComponentProps<typeof Dialog.Content> & {
    showClose?: boolean;
}) {
    return (
        <SheetPortal>
            <SheetOverlay />
            <Dialog.Content
                data-slot="sheet-content"
                className={cn(
                    "fixed inset-y-0 right-0 z-50 flex h-full w-full max-w-sm flex-col border-l border-line-subtle bg-surface-panel p-6 shadow-[0_24px_80px_rgba(23,15,7,0.16)]",
                    className,
                )}
                {...props}
            >
                {children}
                {showClose ? (
                    <Dialog.Close className="absolute right-4 top-4 rounded-full p-2 text-ink-body transition hover:bg-brand-50 hover:text-ink-strong">
                        <X className="h-5 w-5" />
                        <span className="sr-only">Close</span>
                    </Dialog.Close>
                ) : null}
            </Dialog.Content>
        </SheetPortal>
    );
}

export { Sheet, SheetTrigger, SheetContent, SheetClose };
