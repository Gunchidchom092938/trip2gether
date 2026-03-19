"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { LoginForm } from "./login-form";
import { SignupForm } from "./signup-form";
import type { AuthResponse } from "@/services/auth/api";

export type AuthModalMode = "login" | "signup";

type AuthModalProps = {
    open: boolean;
    mode: AuthModalMode;
    onOpenChange: (open: boolean) => void;
    onModeChange: (mode: AuthModalMode) => void;
    onAuthSuccess?: (auth: AuthResponse) => void;
};

export function AuthModal({
    open,
    mode,
    onOpenChange,
    onModeChange,
    onAuthSuccess,
}: Readonly<AuthModalProps>) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className={`overflow-hidden rounded-[1.5rem] p-0 sm:rounded-[2rem] ${
                    mode === "signup"
                        ? "max-h-[80vh] w-[min(calc(100vw-1rem),760px)] sm:max-h-[88vh] sm:w-[min(94vw,760px)]"
                        : "max-h-[80vh] w-[min(calc(100vw-1.25rem),560px)] sm:max-h-[88vh] sm:w-[min(92vw,620px)]"
                }`}
            >
                <DialogHeader className="sr-only">
                    <DialogTitle>
                        {mode === "login" ? "Login" : "Signup"}
                    </DialogTitle>
                    <DialogDescription>
                        {mode === "login"
                            ? "Sign in to Trip2Gather."
                            : "Create your Trip2Gather account."}
                    </DialogDescription>
                </DialogHeader>
                {mode === "login" ? (
                    <LoginForm
                        layout="modal"
                        onCreateAccount={() => onModeChange("signup")}
                        onSuccess={(auth) => {
                            onAuthSuccess?.(auth);
                            onOpenChange(false);
                        }}
                    />
                ) : (
                    <SignupForm
                        layout="modal"
                        onSuccess={(auth) => {
                            onAuthSuccess?.(auth);
                            onOpenChange(false);
                        }}
                        onSwitchToLogin={() => onModeChange("login")}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
}
