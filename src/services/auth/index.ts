"use client";

import { startTransition, useEffect, useState } from "react";

import {
    apiLogout,
    apiSignin,
    apiSignup,
    type AuthResponse,
    type SigninPayload,
    type SignupPayload,
} from "./api";
import { normalizeApiError, type ApiError } from "@/services/core/axios";
import {
    clearStoredAuth,
    getStoredAuth,
    setStoredAuth,
    subscribeStoredAuth,
} from "./storage";

export function useSignup() {
    const [data, setData] = useState<AuthResponse | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<ApiError | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const mutate = async (payload: SignupPayload) => {
        setIsLoading(true);
        setError(null);
        setMessage(null);

        try {
            const response = await apiSignup(payload);
            setStoredAuth(response.data);

            startTransition(() => {
                setData(response.data);
                setMessage(response.message);
            });

            return response.data;
        } catch (caughtError) {
            const normalizedError = normalizeApiError(caughtError);

            startTransition(() => {
                setError(normalizedError);
            });

            throw normalizedError;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        data,
        message,
        error,
        isLoading,
        mutate,
    };
}

export function useSignin() {
    const [data, setData] = useState<AuthResponse | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<ApiError | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const mutate = async (payload: SigninPayload) => {
        setIsLoading(true);
        setError(null);
        setMessage(null);

        try {
            const response = await apiSignin(payload);
            setStoredAuth(response.data);

            startTransition(() => {
                setData(response.data);
                setMessage(response.message);
            });

            return response.data;
        } catch (caughtError) {
            const normalizedError = normalizeApiError(caughtError);

            startTransition(() => {
                setError(normalizedError);
            });

            throw normalizedError;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        data,
        message,
        error,
        isLoading,
        mutate,
    };
}

export function useLogout() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<ApiError | null>(null);

    const mutate = async () => {
        setIsLoading(true);
        setError(null);

        try {
            await apiLogout();
        } catch (caughtError) {
            const normalizedError = normalizeApiError(caughtError);
            setError(normalizedError);
            throw normalizedError;
        } finally {
            clearStoredAuth();
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        error,
        mutate,
    };
}

export function useStoredAuth() {
    const [auth, setAuth] = useState<AuthResponse | null>(() => getStoredAuth());

    useEffect(() => {
        return subscribeStoredAuth(() => {
            startTransition(() => {
                setAuth(getStoredAuth());
            });
        });
    }, []);

    const sync = () => {
        setAuth(getStoredAuth());
    };

    return {
        auth,
        sync,
        isAuthenticated: Boolean(auth?.tokens.accessToken),
    };
}
