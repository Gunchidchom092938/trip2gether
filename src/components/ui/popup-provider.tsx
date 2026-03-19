"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";

import { cn } from "@/lib/utils";

type PopupVariant = "success" | "error" | "info";

type PopupItem = {
    id: string;
    title: string;
    description?: string;
    variant: PopupVariant;
    duration: number;
};

type PushPopupInput = {
    title: string;
    description?: string;
    variant?: PopupVariant;
    duration?: number;
};

type PopupContextValue = {
    pushPopup: (input: PushPopupInput) => void;
    dismissPopup: (id: string) => void;
};

const PopupContext = createContext<PopupContextValue | null>(null);

const variantIcon = {
    success: CheckCircle2,
    error: AlertCircle,
    info: Info,
} as const;

const variantClasses = {
    success:
        "border-emerald-200 bg-[linear-gradient(135deg,rgba(16,185,129,0.12),rgba(255,255,255,0.96))] text-emerald-950",
    error:
        "border-rose-200 bg-[linear-gradient(135deg,rgba(244,63,94,0.1),rgba(255,255,255,0.96))] text-rose-950",
    info:
        "border-brand-100 bg-[linear-gradient(135deg,rgba(220,155,28,0.12),rgba(255,255,255,0.96))] text-ink-strong",
} as const;

let popupSequence = 0;

export function PopupProvider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [popups, setPopups] = useState<PopupItem[]>([]);
    const timeoutMapRef = useRef<Map<string, number>>(new Map());

    const dismissPopup = useCallback((id: string) => {
        const timeoutId = timeoutMapRef.current.get(id);

        if (timeoutId) {
            window.clearTimeout(timeoutId);
            timeoutMapRef.current.delete(id);
        }

        setPopups((current) => current.filter((popup) => popup.id !== id));
    }, []);

    const pushPopup = useCallback(
        ({
            title,
            description,
            variant = "info",
            duration = 3200,
        }: PushPopupInput) => {
            const id = `popup-${popupSequence++}`;

            setPopups((current) => [
                ...current,
                { id, title, description, variant, duration },
            ]);

            const timeoutId = window.setTimeout(() => {
                dismissPopup(id);
            }, duration);

            timeoutMapRef.current.set(id, timeoutId);
        },
        [dismissPopup],
    );

    useEffect(() => {
        const timeoutMap = timeoutMapRef.current;

        return () => {
            timeoutMap.forEach((timeoutId) => {
                window.clearTimeout(timeoutId);
            });
            timeoutMap.clear();
        };
    }, []);

    return (
        <PopupContext.Provider value={{ pushPopup, dismissPopup }}>
            {children}
            <div className="pointer-events-none fixed inset-x-0 top-4 z-[80] flex justify-center px-3 sm:justify-end sm:px-5">
                <div className="flex w-full max-w-sm flex-col gap-3">
                    {popups.map((popup) => {
                        const Icon = variantIcon[popup.variant];

                        return (
                            <div
                                key={popup.id}
                                className={cn(
                                    "pointer-events-auto overflow-hidden rounded-[1.5rem] border shadow-[0_18px_40px_rgba(36,24,21,0.16)] backdrop-blur",
                                    "animate-[toast-in_220ms_ease-out]",
                                    variantClasses[popup.variant],
                                )}
                            >
                                <div className="flex items-start gap-3 p-4">
                                    <div className="mt-0.5 rounded-full bg-white/70 p-2">
                                        <Icon className="h-4 w-4" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-semibold">
                                            {popup.title}
                                        </p>
                                        {popup.description ? (
                                            <p className="mt-1 text-sm leading-5 text-current/80">
                                                {popup.description}
                                            </p>
                                        ) : null}
                                    </div>
                                    <button
                                        type="button"
                                        className="rounded-full p-1.5 text-current/70 hover:bg-white/60 hover:text-current"
                                        onClick={() =>
                                            dismissPopup(popup.id)
                                        }
                                    >
                                        <X className="h-4 w-4" />
                                        <span className="sr-only">Close</span>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </PopupContext.Provider>
    );
}

export function usePopup() {
    const context = useContext(PopupContext);

    if (!context) {
        throw new Error("usePopup must be used within PopupProvider");
    }

    return context;
}
