import axios, { AxiosError } from "axios";
import { getStoredAuth } from "@/services/auth/storage";

export type ApiSuccess<T> = {
    code: number;
    message: string;
    data: T;
};

export type ApiError = {
    code: number;
    message: string;
    errors?: string[] | null;
    path?: string;
    timestamp?: string;
};

export const axiosInstance = axios.create({
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use((config) => {
    const storedAuth = getStoredAuth();
    const accessToken = storedAuth?.tokens.accessToken;

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
});

export const getApiBaseUrl = () => {
    const baseURL = process.env.NEXT_PUBLIC_API_URL;

    if (!baseURL) {
        throw new Error("NEXT_PUBLIC_API_URL is undefined");
    }

    return baseURL;
};

export const normalizeApiError = (error: unknown): ApiError => {
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiError>;

        return (
            axiosError.response?.data ?? {
                code: axiosError.response?.status ?? 500,
                message: axiosError.message || "Can't connect to server",
                errors: null,
            }
        );
    }

    return {
        code: 500,
        message: "Can't connect to server",
        errors: null,
    };
};
