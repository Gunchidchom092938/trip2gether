import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
    return (
        <textarea
            data-slot="textarea"
            className={cn(
                "min-h-28 w-full rounded-3xl border border-line-subtle bg-surface-soft px-4 py-3 text-sm text-ink-strong outline-none transition focus-visible:border-brand-500 focus-visible:ring-4 focus-visible:ring-brand-100 disabled:cursor-not-allowed disabled:opacity-50",
                className,
            )}
            {...props}
        />
    );
}

export { Textarea };
