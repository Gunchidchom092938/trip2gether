"use client";

import { useId, useState } from "react";
import { useTranslations } from "next-intl";

import { ActionButton } from "@/components/action-button";
import { Input } from "@/components/ui/input";
import { useRouter } from "@/i18n/navigation";
import { useSignup } from "@/services/auth";
import type { AuthResponse } from "@/services/auth/api";
import { usePopup } from "@/components/ui/popup-provider";

type SignupFormProps = {
    layout?: "section" | "modal";
    onSwitchToLogin?: () => void;
    onSuccess?: (auth: AuthResponse) => void;
};

export function SignupForm({
    layout = "modal",
    onSwitchToLogin,
    onSuccess,
}: Readonly<SignupFormProps>) {
    const t = useTranslations("HomePage");
    const emailId = useId();
    const usernameId = useId();
    const passwordId = useId();
    const confirmPasswordId = useId();
    const firstNameId = useId();
    const lastNameId = useId();
    const genderId = useId();
    const birthDateId = useId();
    const router = useRouter();
    const { pushPopup } = usePopup();

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});
    const { isLoading, mutate, error } = useSignup();

    const validate = () => {
        const nextErrors: Record<string, string> = {};
        const trimmedEmail = email.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!firstName.trim()) nextErrors.firstName = t("requiredFieldMessage");
        if (!lastName.trim()) nextErrors.lastName = t("requiredFieldMessage");
        if (!trimmedEmail) nextErrors.email = t("requiredFieldMessage");
        else if (!emailPattern.test(trimmedEmail)) {
            nextErrors.email = t("invalidEmailMessage");
        }
        if (!username.trim()) nextErrors.username = t("requiredFieldMessage");
        if (!gender) nextErrors.gender = t("requiredFieldMessage");
        if (!birthDate) nextErrors.birthDate = t("requiredFieldMessage");
        if (!password) nextErrors.password = t("requiredFieldMessage");
        else if (password.length < 8) {
            nextErrors.password = t("passwordMinMessage");
        }
        if (!confirmPassword) {
            nextErrors.confirmPassword = t("requiredFieldMessage");
        } else if (confirmPassword !== password) {
            nextErrors.confirmPassword = t("passwordMismatchMessage");
        }

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
                username: username.trim(),
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                gender: gender as "female" | "male" | "other",
                birthDate,
                password,
                confirmPassword,
            });

            setErrors({});
            pushPopup({
                variant: "success",
                title: t("signupSuccessToastTitle"),
                description: t("signupSuccessMessage"),
            });
            onSuccess?.(auth);
            router.push(`/${auth.user.username}`);
        } catch (signupError) {
            const apiError = signupError as {
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
                title: t("signupErrorToastTitle"),
                description: errorMessage,
            });
        }
    };

    const modalClassName =
        layout === "modal"
            ? "max-h-[80vh] overflow-y-auto px-4 py-4 sm:max-h-[88vh] sm:px-6 sm:py-6"
            : "";

    return (
        <div className={modalClassName}>
            <div className={layout === "modal" ? "mb-4 sm:mb-6" : "mb-8"}>
                <p className="text-sm font-medium uppercase tracking-[0.3em] text-brand-700">
                    {t("signupEyebrow")}
                </p>
                <h3
                    className={`font-semibold tracking-tight text-ink-strong ${
                        layout === "modal"
                            ? "mt-2 text-xl sm:mt-3 sm:text-3xl"
                            : "mt-3 text-3xl"
                    }`}
                >
                    {t("signupTitle")}
                </h3>
                <p className="mt-2 text-sm leading-5 text-ink-body sm:leading-6">
                    {t("signupDescription")}
                </p>
            </div>

            <form
                className={layout === "modal" ? "space-y-3 sm:space-y-4" : "space-y-5"}
                onSubmit={(event) => {
                    event.preventDefault();
                    void handleSubmit();
                }}
            >
                <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-2">
                        <label
                            className="text-sm font-medium text-ink-body"
                            htmlFor={firstNameId}
                        >
                            {t("firstNameLabel")}
                        </label>
                        <Input
                            id={firstNameId}
                            value={firstName}
                            onChange={(event) => {
                                setFirstName(event.target.value);
                                setErrors((current) => ({
                                    ...current,
                                    firstName: "",
                                }));
                            }}
                            placeholder={t("firstNamePlaceholder")}
                            className="bg-surface-raised"
                        />
                        {errors.firstName ? (
                            <p className="text-xs text-red-600">{errors.firstName}</p>
                        ) : null}
                    </div>
                    <div className="space-y-2">
                        <label
                            className="text-sm font-medium text-ink-body"
                            htmlFor={lastNameId}
                        >
                            {t("lastNameLabel")}
                        </label>
                        <Input
                            id={lastNameId}
                            value={lastName}
                            onChange={(event) => {
                                setLastName(event.target.value);
                                setErrors((current) => ({
                                    ...current,
                                    lastName: "",
                                }));
                            }}
                            placeholder={t("lastNamePlaceholder")}
                            className="bg-surface-raised"
                        />
                        {errors.lastName ? (
                            <p className="text-xs text-red-600">{errors.lastName}</p>
                        ) : null}
                    </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
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
                        <label
                            className="text-sm font-medium text-ink-body"
                            htmlFor={usernameId}
                        >
                            {t("usernameLabel")}
                        </label>
                        <Input
                            id={usernameId}
                            value={username}
                            onChange={(event) => {
                                setUsername(event.target.value);
                                setErrors((current) => ({
                                    ...current,
                                    username: "",
                                }));
                            }}
                            placeholder={t("usernamePlaceholder")}
                            className="bg-surface-raised"
                        />
                        {errors.username ? (
                            <p className="text-xs text-red-600">{errors.username}</p>
                        ) : null}
                    </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-2">
                        <label
                            className="text-sm font-medium text-ink-body"
                            htmlFor={genderId}
                        >
                            {t("genderLabel")}
                        </label>
                        <select
                            id={genderId}
                            value={gender}
                            onChange={(event) => {
                                setGender(event.target.value);
                                setErrors((current) => ({
                                    ...current,
                                    gender: "",
                                }));
                            }}
                            className="flex h-12 w-full rounded-2xl border border-line-subtle bg-surface-raised px-4 text-sm text-ink-strong outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
                        >
                            <option value="">{t("genderPlaceholder")}</option>
                            <option value="female">{t("genderFemale")}</option>
                            <option value="male">{t("genderMale")}</option>
                            <option value="other">{t("genderOther")}</option>
                        </select>
                        {errors.gender ? (
                            <p className="text-xs text-red-600">{errors.gender}</p>
                        ) : null}
                    </div>
                    <div className="space-y-2">
                        <label
                            className="text-sm font-medium text-ink-body"
                            htmlFor={birthDateId}
                        >
                            {t("birthDateLabel")}
                        </label>
                        <Input
                            id={birthDateId}
                            type="date"
                            value={birthDate}
                            onChange={(event) => {
                                setBirthDate(event.target.value);
                                setErrors((current) => ({
                                    ...current,
                                    birthDate: "",
                                }));
                            }}
                            className="bg-surface-raised"
                        />
                        {errors.birthDate ? (
                            <p className="text-xs text-red-600">{errors.birthDate}</p>
                        ) : null}
                    </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-2">
                        <label
                            className="text-sm font-medium text-ink-body"
                            htmlFor={passwordId}
                        >
                            {t("passwordLabel")}
                        </label>
                        <Input
                            id={passwordId}
                            type="password"
                            value={password}
                            onChange={(event) => {
                                setPassword(event.target.value);
                                setErrors((current) => ({
                                    ...current,
                                    password: "",
                                    confirmPassword:
                                        current.confirmPassword &&
                                        confirmPassword === event.target.value
                                            ? ""
                                            : current.confirmPassword,
                                }));
                            }}
                            placeholder={t("signupPasswordPlaceholder")}
                            className="bg-surface-raised"
                        />
                        {errors.password ? (
                            <p className="text-xs text-red-600">{errors.password}</p>
                        ) : null}
                    </div>

                    <div className="space-y-2">
                        <label
                            className="text-sm font-medium text-ink-body"
                            htmlFor={confirmPasswordId}
                        >
                            {t("confirmPasswordLabel")}
                        </label>
                        <Input
                            id={confirmPasswordId}
                            type="password"
                            value={confirmPassword}
                            onChange={(event) => {
                                setConfirmPassword(event.target.value);
                                setErrors((current) => ({
                                    ...current,
                                    confirmPassword: "",
                                }));
                            }}
                            placeholder={t("confirmPasswordPlaceholder")}
                            className="bg-surface-raised"
                        />
                        {errors.confirmPassword ? (
                            <p className="text-xs text-red-600">
                                {errors.confirmPassword}
                            </p>
                        ) : null}
                    </div>
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
                    label={isLoading ? t("loadingLabel") : t("createAccount")}
                    disabled={isLoading}
                />
            </form>

            <p className="mt-4 text-center text-sm text-ink-body sm:mt-6">
                {t("alreadyHaveAccount")}{" "}
                <button
                    type="button"
                    className="font-semibold text-ink-strong"
                    onClick={onSwitchToLogin}
                >
                    {t("signIn")}
                </button>
            </p>
        </div>
    );
}
