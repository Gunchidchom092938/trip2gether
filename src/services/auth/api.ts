import {
    axiosInstance,
    getApiBaseUrl,
    type ApiSuccess,
} from "@/services/core/axios";

export const AUTH_ROUTE = {
    URL_POST_SIGNUP: "/api/auth/signup",
    URL_POST_SIGNIN: "/api/auth/signin",
    URL_POST_LOGOUT: "/api/auth/logout",
} as const;

export type SignupPayload = {
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    gender: "female" | "male" | "other";
    birthDate: string;
    password: string;
    confirmPassword: string;
};

export type AuthUser = {
    id: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    gender: string;
    birthDate: string;
    displayName: string;
    createdAt: string;
    updatedAt: string;
};

export type AuthTokens = {
    accessToken: string;
    refreshToken: string;
};

export type AuthResponse = {
    user: AuthUser;
    tokens: AuthTokens;
};

export type SigninPayload = {
    email: string;
    password: string;
};

export const apiSignup = async (
    payload: SignupPayload,
): Promise<ApiSuccess<AuthResponse>> => {
    axiosInstance.defaults.baseURL = getApiBaseUrl();

    const { data } = await axiosInstance.post<ApiSuccess<AuthResponse>>(
        AUTH_ROUTE.URL_POST_SIGNUP,
        payload,
    );

    return data;
};

export const apiSignin = async (
    payload: SigninPayload,
): Promise<ApiSuccess<AuthResponse>> => {
    axiosInstance.defaults.baseURL = getApiBaseUrl();

    const { data } = await axiosInstance.post<ApiSuccess<AuthResponse>>(
        AUTH_ROUTE.URL_POST_SIGNIN,
        payload,
    );

    return data;
};

export const apiLogout = async (): Promise<ApiSuccess<null>> => {
    axiosInstance.defaults.baseURL = getApiBaseUrl();

    const { data } = await axiosInstance.post<ApiSuccess<null>>(
        AUTH_ROUTE.URL_POST_LOGOUT,
    );

    return data;
};
