import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseAPI";

export const AuthAPI = createApi({
  reducerPath: "AuthAPI",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),

    verifyOtp: builder.mutation({
      query: (body) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body,
      }),
    }),
     resendOtp: builder.mutation({
      query: (body) => ({
        url: "/auth/resend-otp",
        method: "POST",
        body,
      }),
    }),

    register: builder.mutation({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    }),

    updatePassword: builder.mutation({
      query: (body) => ({
        url: "/updatePassword",
        method: "POST",
        body,
      }),
    }),

    forgotPassword: builder.mutation({
      query: (body) => ({
        url: "/forgot-password",
        method: "POST",
        body,
      }),
    }),

    getUser: builder.query({
      query: () => ({
        url: "/getUser",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useRegisterMutation,
  useUpdatePasswordMutation,
  useForgotPasswordMutation,
  useGetUserQuery,

} = AuthAPI;
