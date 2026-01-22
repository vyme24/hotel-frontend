import { useEffect, useMemo, useRef, useState } from "react";
import {
  useGetAllNotificationsQuery,
  useMarkNotificationAsReadMutation,
} from "../../services/notificationService";

import { Bell, CheckCheck, Dot } from "lucide-react";

const Notification = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // ✅ Query
  const {
    data: notificationsRes,
    isLoading,
    isSuccess,
    refetch,
  } = useGetAllNotificationsQuery();

  const [markNotificationAsRead] = useMarkNotificationAsReadMutation();

  // ✅ Safe array
  const notifications = useMemo(() => {
    // adjust based on your API response structure
    // if your API returns {data: []} then use notificationsRes?.data
    return notificationsRes?.data || notificationsRes || [];
  }, [notificationsRes]);

  // ✅ unread count (assume notification.isRead exists)
  const unreadCount = useMemo(() => {
    return notifications.filter((n) => !n?.isRead).length;
  }, [notifications]);

  // ✅ Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debug
  useEffect(() => {
    if (isSuccess) {
      console.log("Notifications:", notifications);
    }
  }, [isSuccess, notifications]);

  // ✅ Mark single as read
  const handleMarkAsRead = async (id) => {
    try {
      await markNotificationAsRead(id).unwrap();
      refetch();
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  // ✅ Mark all read
  const markAllAsRead = async () => {
    try {
      const unread = notifications.filter((n) => !n?.isRead);
      await Promise.all(unread.map((n) => markNotificationAsRead(n?.id).unwrap()));
      refetch();
    } catch (error) {
      console.error("Failed to mark all as read:", error);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Button */}
      <button
        onClick={() => setIsOpen((p) => !p)}
        className="relative h-10 w-10 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition flex items-center justify-center"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5 text-gray-700" />

        {/* Badge */}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center shadow">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-[340px] max-w-[90vw] bg-white border border-gray-200 shadow-xl rounded-2xl overflow-hidden z-[999999]">
          {/* Header */}
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-gray-900">Notifications</p>
              <p className="text-[11px] text-gray-500">
                {unreadCount > 0 ? `${unreadCount} unread` : "All caught up 🎉"}
              </p>
            </div>

            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs font-semibold text-red-700 hover:text-red-800 transition inline-flex items-center gap-1"
              >
                <CheckCheck className="w-4 h-4" />
                Mark all
              </button>
            )}
          </div>

          {/* List */}
          <div className="max-h-[360px] overflow-y-auto">
            {isLoading ? (
              <div className="p-4 text-sm text-gray-500">Loading...</div>
            ) : notifications.length > 0 ? (
              <div className="p-2 space-y-1">
                {notifications.map((n) => {
                  const isUnread = !n?.isRead;

                  return (
                    <button
                      key={n?.id}
                      onClick={() => handleMarkAsRead(n?.id)}
                      className={`w-full text-left p-3 rounded-xl border transition flex gap-3
                      ${
                        isUnread
                          ? "bg-red-50/40 border-red-100 hover:bg-red-50"
                          : "bg-white border-gray-100 hover:bg-gray-50"
                      }`}
                    >
                      {/* Dot */}
                      <div className="pt-1">
                        <Dot
                          className={`w-6 h-6 ${
                            isUnread ? "text-red-600" : "text-gray-300"
                          }`}
                        />
                      </div>

                      {/* Content */}
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {n?.title || "System Update"}
                        </p>
                        <p className="text-xs text-gray-600 mt-0.5 line-clamp-2">
                          {n?.message || "You have a new notification."}
                        </p>
                        <p className="text-[11px] text-gray-400 mt-1">
                          {n?.createdAt
                            ? new Date(n.createdAt).toLocaleString()
                            : ""}
                        </p>
                      </div>

                      {/* Unread Tag */}
                      {isUnread && (
                        <span className="text-[10px] font-bold text-red-700 bg-red-100 px-2 py-1 rounded-full h-fit">
                          NEW
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="p-6 text-center">
                <div className="mx-auto h-12 w-12 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-gray-400" />
                </div>
                <p className="text-sm font-semibold text-gray-900 mt-3">
                  No notifications
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  You don’t have any new alerts right now.
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-gray-100 bg-white flex items-center justify-between">
            <button
              onClick={() => refetch()}
              className="text-xs font-semibold text-gray-700 hover:text-gray-900 transition"
            >
              Refresh
            </button>

            <button
              onClick={() => setIsOpen(false)}
              className="text-xs font-semibold text-gray-500 hover:text-gray-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
