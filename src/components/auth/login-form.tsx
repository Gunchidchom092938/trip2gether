"use client";

import { useId, useState } from "react";
import { useTranslations } from "next-intl";

import { ActionButton } from "@/components/action-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "@/i18n/navigation";
import { useSignin } from "@/services/auth";
import type { AuthResponse } from "@/services/auth/api";
import { usePopup } from "@/components/ui/popup-provider";

type LoginFormProps = {
    layout?: "section" | "modal";
    onCreateAccount?: () => void;
    onSuccess?: (auth: AuthResponse) => void;
};

export function LoginForm({
    layout = "section",
    onCreateAccount,
    onSuccess,
}: Readonly<LoginFormProps>) {
    const t = useTranslations("HomePage");
    const emailId = useId();
    const passwordId = useId();
    const rememberId = useId();
    const router = useRouter();
    const { pushPopup } = usePopup();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(true);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const { isLoading, mutate, error } = useSignin();

    const validate = () => {
        const nextErrors: Record<string, string> = {};
        const trimmedEmail = email.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!trimmedEmail) nextErrors.email = t("requiredFieldMessage");
        else if (!emailPattern.test(trimmedEmail)) {
            nextErrors.email = t("invalidEmailMessage");
        }
        if (!password) nextErrors.password = t("requiredFieldMessage");

        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    };

    const handleSubmit = async () => {
        const isValid = validate();

        if (!isValid) {
            return;
        }

        try {
            const auth = await mutate({
                email: email.trim(),
                password,
            });

            setErrors({});
            pushPopup({
                variant: "success",
                title: t("signinSuccessToastTitle"),
                description: t("signinSuccessMessage"),
            });
            onSuccess?.(auth);
            router.push(`/${auth.user.username}`);
        } catch (signinError) {
            const apiError = signinError as {
                message?: string;
                errors?: string[] | null;
            };

            const errorMessage =
                apiError.errors?.[0] ?? apiError.message ?? t("genericAuthError");

            if (apiError.errors?.length) {
                setErrors((current) => ({
                    ...current,
                    form: errorMessage,
                }));
            } else if (errorMessage) {
                setErrors((current) => ({
                    ...current,
                    form: errorMessage,
                }));
            }

            pushPopup({
                variant: "error",
                title: t("signinErrorToastTitle"),
                description: errorMessage,
            });
        }
    };

    return (
        <div
            className={
                layout === "modal"
                    ? "max-h-[80vh] overflow-y-auto px-4 py-4 sm:max-h-[88vh] sm:px-7 sm:py-8"
                    : ""
            }
        >
            <div className={layout === "modal" ? "mb-6 sm:mb-8" : "mb-8"}>
                <p className="text-sm font-medium uppercase tracking-[0.3em] text-brand-700">
                    {t("loginEyebrow")}
                </p>
                <h3
                    className={`font-semibold tracking-tight text-ink-strong ${
                        layout === "modal"
                            ? "mt-2 text-2xl sm:mt-3 sm:text-3xl"
                            : "mt-3 text-3xl"
                    }`}
                >
                    {t("loginTitle")}
                </h3>
                <p className="mt-2 text-sm leading-6 text-ink-body">
                    {t("loginDescription")}
                </p>
            </div>

            <form
                className={
                    layout === "modal" ? "space-y-4 sm:space-y-6" : "space-y-5"
                }
                onSubmit={(event) => {
                    event.preventDefault();
                    void handleSubmit();
                }}
            >
                <div className="space-y-2">
                    <label
                        className="text-sm font-medium text-ink-body"
                        htmlFor={emailId}
                    >
                        {t("emailLabel")}
                    </label>

                    <Input
                        id={emailId}
                        type="email"
                        value={email}
                        onChange={(event) => {
                            setEmail(event.target.value);
                            setErrors((current) => ({
                                ...current,
                                email: "",
                                form: "",
                            }));
                        }}
                        placeholder={t("emailPlaceholder")}
                        className="bg-surface-raised"
                    />
                    {errors.email ? (
                        <p className="text-xs text-red-600">{errors.email}</p>
                    ) : null}
                </div>

                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <label
                            className="text-sm font-medium text-ink-body"
                            htmlFor={passwordId}
                        >
                            {t("passwordLabel")}
                        </label>
                        <a
                            href="#"
                            className="text-sm font-medium text-brand-700 transition hover:text-brand-900"
                        >
                            {t("forgotPassword")}
                        </a>
                    </div>
                    <Input
                        id={passwordId}
                        type="password"
                        value={password}
                        onChange={(event) => {
                            setPassword(event.target.value);
                            setErrors((current) => ({
                                ...current,
                                password: "",
                                form: "",
                            }));
                        }}
                        placeholder={t("passwordPlaceholder")}
                        className="bg-surface-raised"
                    />
                    {errors.password ? (
                        <p className="text-xs text-red-600">{errors.password}</p>
                    ) : null}
                </div>

                <div className="flex items-center justify-between text-sm text-ink-body">
                    <label
                        className="flex items-center gap-3"
                        htmlFor={rememberId}
                    >
                        <input
                            id={rememberId}
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(event) =>
                                setRememberMe(event.target.checked)
                            }
                            className="h-4 w-4 rounded border-line-subtle text-brand-500 focus:ring-brand-500"
                        />
                        {t("rememberMe")}
                    </label>
                    <span>{t("secureLogin")}</span>
                </div>

                {errors.form ? (
                    <p className="text-sm text-red-600">{errors.form}</p>
                ) : null}
                {error && !errors.form ? (
                    <p className="text-sm text-red-600">{error.message}</p>
                ) : null}

                <ActionButton
                    type="submit"
                    color="dark"
                    label={isLoading ? t("loadingLabel") : t("signIn")}
                    disabled={isLoading}
                />
            </form>

            <div
                className={`flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-ink-body/60 ${
                    layout === "modal" ? "my-5 sm:my-7" : "my-6"
                }`}
            >
                <div className="h-px flex-1 bg-line-subtle" />
                {t("continueWith")}
                <div className="h-px flex-1 bg-line-subtle" />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-11 rounded-2xl"
                >
                    Google
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-11 rounded-2xl"
                >
                    Apple
                </Button>
            </div>

            <p className="mt-6 text-center text-sm text-ink-body">
                {t("newToTrip2Gather")}{" "}
                <button
                    type="button"
                    className="font-semibold text-ink-strong"
                    onClick={onCreateAccount}
                >
                    {t("createAccount")}
                </button>
            </p>
        </div>
    );
}
