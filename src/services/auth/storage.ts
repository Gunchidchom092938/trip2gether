import type { AuthResponse } from "./api";

const AUTH_STORAGE_KEY = "trip2gather.auth";
const AUTH_STORAGE_EVENT = "trip2gather:auth-changed";

export type StoredAuth = AuthResponse;

const dispatchAuthChangedEvent = () => {
    window.dispatchEvent(new CustomEvent(AUTH_STORAGE_EVENT));
};

export const setStoredAuth = (auth: StoredAuth) => {
    if (typeof window === "undefined") {
        return;
    }

    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
    dispatchAuthChangedEvent();
};

export const getStoredAuth = (): StoredAuth | null => {
    if (typeof window === "undefined") {
        return null;
    }

    const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) {
        return null;
    }

    try {
        return JSON.parse(raw) as StoredAuth;
    } catch {
        return null;
    }
};

export const clearStoredAuth = () => {
    if (typeof window === "undefined") {
        return;
    }

    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    dispatchAuthChangedEvent();
};

export const subscribeStoredAuth = (callback: () => void) => {
    if (typeof window === "undefined") {
        return () => undefined;
    }

    const handleStorage = (event: StorageEvent) => {
        if (event.key && event.key !== AUTH_STORAGE_KEY) {
            return;
        }

        callback();
    };

    const handleCustomEvent = () => {
        callback();
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener(AUTH_STORAGE_EVENT, handleCustomEvent);

    return () => {
        window.removeEventListener("storage", handleStorage);
        window.removeEventListener(AUTH_STORAGE_EVENT, handleCustomEvent);
    };
};
