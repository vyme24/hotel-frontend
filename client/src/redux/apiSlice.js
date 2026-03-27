import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "../services/baseQueryWithAuth";

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Hotels", "Hotel", "Rooms", "Bookings", "Payment", "Reviews", "Offers", "Notifications", "User"],
  endpoints: (builder) => ({

    // ─── Auth ────────────────────────────────────────────────────────
    login: builder.mutation({
      query: (body) => ({ url: "/auth/login", method: "POST", body }),
    }),
    register: builder.mutation({
      query: (body) => ({ url: "/auth/register", method: "POST", body }),
    }),
    verifyOtp: builder.mutation({
      query: (body) => ({ url: "/auth/verify-otp", method: "POST", body }),
    }),
    resendOtp: builder.mutation({
      query: (body) => ({ url: "/auth/resend-otp", method: "POST", body }),
    }),
    forgotPassword: builder.mutation({
      query: (body) => ({ url: "/auth/forgot-password", method: "POST", body }),
    }),
    resetPassword: builder.mutation({
      query: (body) => ({ url: "/auth/reset-password", method: "POST", body }),
    }),

    // ─── Hotels ──────────────────────────────────────────────────────
    // GET /api/hotel?location=&minPrice=&maxPrice=&stars=&sort=
    getHotels: builder.query({
      query: (params = {}) => ({ url: "/hotel", params }),
      providesTags: ["Hotels"],
      // Normalize response — backend returns { status, data, total }
      transformResponse: (res) => ({
        hotels: res.data || [],
        total: res.total || 0,
        page: res.page || 1,
        limit: res.limit || 10,
        totalPages: res.totalPages || 1,
      }),
    }),
    // GET /api/hotel/:id  (returns hotel + rooms + reviews in one call)
    getHotel: builder.query({
      query: (id) => `/hotel/${id}`,
      providesTags: (result, error, id) => [{ type: "Hotel", id }],
      transformResponse: (res) => res.data || res,
    }),

    // ─── Rooms ───────────────────────────────────────────────────────
    // GET /api/room/hotel/:hotelId
    getRooms: builder.query({
      query: (hotelId) => `/room/hotel/${hotelId}`,
      providesTags: ["Rooms"],
      transformResponse: (res) => res.data || [],
    }),
    // GET /api/room/:id
    getRoom: builder.query({
      query: (id) => `/room/${id}`,
      transformResponse: (res) => res.data || res,
    }),

    // ─── Bookings ────────────────────────────────────────────────────
    // POST /api/booking
    createBooking: builder.mutation({
      query: (body) => ({ url: "/booking", method: "POST", body }),
      invalidatesTags: ["Bookings"],
      transformResponse: (res) => res,
    }),
    // GET /api/booking/my-bookings
    getUserBookings: builder.query({
      query: () => "/booking/my-bookings",
      providesTags: ["Bookings"],
      transformResponse: (res) => res.data || [],
    }),
    // GET /api/booking/:id
    getBookingById: builder.query({
      query: (id) => `/booking/${id}`,
      providesTags: ["Bookings"],
      transformResponse: (res) => res.data || res,
    }),

    // ─── Payments ────────────────────────────────────────────────────
    // POST /api/payment
    createPayment: builder.mutation({
      query: (body) => ({ url: "/payment", method: "POST", body }),
      invalidatesTags: ["Payment", "Bookings"],
    }),
    // GET /api/payment/booking/:bookingId
    getPaymentStatus: builder.query({
      query: (bookingId) => `/payment/booking/${bookingId}`,
      providesTags: ["Payment"],
    }),

    // ─── Reviews ─────────────────────────────────────────────────────
    // GET /api/review  (all, for home page) OR GET /api/review/:hotelId
    getReviews: builder.query({
      query: (hotelId) => (hotelId && hotelId !== "all" ? `/review/${hotelId}` : "/review"),
      providesTags: ["Reviews"],
      transformResponse: (res) => res.data || [],
    }),
    // POST /api/review
    createReview: builder.mutation({
      query: (body) => ({ url: "/review", method: "POST", body }),
      invalidatesTags: ["Reviews", "Hotels"],
    }),

    // ─── Offers / Coupons ─────────────────────────────────────────────
    // GET /api/offer
    getOffers: builder.query({
      query: () => "/offer",
      providesTags: ["Offers"],
      transformResponse: (res) => res.data || [],
    }),
    // POST /api/offer/apply  { code, amount }
    applyCoupon: builder.mutation({
      query: (body) => ({ url: "/offer/apply", method: "POST", body }),
    }),
    // GET /api/offer/code/:code
    verifyCoupon: builder.query({
      query: (code) => `/offer/code/${code}`,
    }),

    // ─── Notifications ────────────────────────────────────────────────
    // GET /api/notification
    getNotifications: builder.query({
      query: () => "/notification",
      providesTags: ["Notifications"],
      transformResponse: (res) => ({ data: res.data || [], unreadCount: res.unreadCount || 0 }),
    }),
    // PATCH /api/notification/:id/read
    markNotificationRead: builder.mutation({
      query: (id) => ({ url: `/notification/${id}/read`, method: "PATCH" }),
      invalidatesTags: ["Notifications"],
    }),
    // PATCH /api/notification/read-all
    markAllNotificationsRead: builder.mutation({
      query: () => ({ url: "/notification/read-all", method: "PATCH" }),
      invalidatesTags: ["Notifications"],
    }),

    // ─── User ─────────────────────────────────────────────────────────
    getProfile: builder.query({
      query: () => "/user/get",
      providesTags: ["User"],
      transformResponse: (res) => res.data || res,
    }),
    updateProfile: builder.mutation({
      query: (body) => ({ url: "/user/profile", method: "PUT", body }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  // Auth
  useLoginMutation,
  useRegisterMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  // Hotels
  useGetHotelsQuery,
  useGetHotelQuery,
  // Rooms
  useGetRoomsQuery,
  useGetRoomQuery,
  // Bookings
  useCreateBookingMutation,
  useGetUserBookingsQuery,
  useGetBookingByIdQuery,
  // Payments
  useCreatePaymentMutation,
  useGetPaymentStatusQuery,
  // Reviews
  useGetReviewsQuery,
  useCreateReviewMutation,
  // Offers
  useGetOffersQuery,
  useApplyCouponMutation,
  useVerifyCouponQuery,
  // Notifications
  useGetNotificationsQuery,
  useMarkNotificationReadMutation,
  useMarkAllNotificationsReadMutation,
  // User
  useGetProfileQuery,
  useUpdateProfileMutation,
} = api;
