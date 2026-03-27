import { motion } from "framer-motion";
import {
  Bell,
  BookOpen,
  Tag,
  AlertCircle,
  Info,
  CheckCheck,
  CreditCard,
  ShieldCheck,
} from "lucide-react";
import {
  useGetNotificationsQuery,
  useMarkNotificationReadMutation,
  useMarkAllNotificationsReadMutation,
} from "../../redux/apiSlice";
import { useSelector } from "react-redux";
import { PageLoader } from "../../components/Loader/Loader";
import "./Notifications.css";

const TYPE_META = {
  booking: { icon: <BookOpen size={18} />, label: "Booking", tone: "booking" },
  payment: { icon: <CreditCard size={18} />, label: "Payment", tone: "payment" },
  offer: { icon: <Tag size={18} />, label: "Offer", tone: "offer" },
  security: { icon: <ShieldCheck size={18} />, label: "Security", tone: "alert" },
  alert: { icon: <AlertCircle size={18} />, label: "Alert", tone: "alert" },
  general: { icon: <Info size={18} />, label: "Update", tone: "general" },
};

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
}

function normalizeNotification(notification) {
  const type = notification.type || "general";
  const meta = TYPE_META[type] || TYPE_META.general;

  let title = notification.title || meta.label;
  let message = notification.message || "You have a new update.";

  if (type === "booking") {
    title = "Booking update";
  }
  if (type === "payment") {
    title = "Payment update";
  }
  if (type === "offer") {
    title = "Offer available";
  }

  return {
    ...notification,
    displayTitle: title,
    displayMessage: message,
    meta,
  };
}

export default function Notifications() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { data: notifData, isLoading } = useGetNotificationsQuery(undefined, { skip: !isAuthenticated });
  const [markRead] = useMarkNotificationReadMutation();
  const [markAllRead] = useMarkAllNotificationsReadMutation();

  const notifications = (notifData?.data || []).map(normalizeNotification);
  const unreadCount = notifData?.unreadCount || notifications.filter((n) => !n.isRead).length;

  const handleMarkRead = async (id) => {
    try {
      await markRead(id).unwrap();
    } catch {
      // Quiet fail for a calmer UX.
    }
  };

  const handleMarkAll = async () => {
    try {
      await markAllRead().unwrap();
    } catch {
      // Quiet fail for a calmer UX.
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="notif-page">
        <div className="notif-page__container">
          <div className="notif-empty">
            <div className="notif-empty__icon"><Bell size={28} /></div>
            <div className="notif-empty__title">Sign in to view updates</div>
            <p>Booking, payment, and offer updates will appear here.</p>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) return <PageLoader />;

  return (
    <div className="notif-page">
      <div className="notif-page__container">
        <div className="notif-page__header">
          <div>
            <div className="notif-page__eyebrow">Inbox</div>
            <div className="notif-page__title">
              <Bell size={22} />
              Notifications
              {unreadCount > 0 && <span className="notif-badge-count">{unreadCount}</span>}
            </div>
          </div>

          {unreadCount > 0 && (
            <button className="notif-mark-all-btn" onClick={handleMarkAll}>
              <CheckCheck size={15} /> Mark all read
            </button>
          )}
        </div>

        {notifications.length === 0 ? (
          <div className="notif-empty">
            <div className="notif-empty__icon"><Bell size={28} /></div>
            <div className="notif-empty__title">No new updates</div>
            <p>Your latest booking and payment updates will show up here.</p>
          </div>
        ) : (
          <div className="notif-list">
            {notifications.map((notification, index) => (
              <motion.button
                key={notification._id}
                type="button"
                className={`notif-item${!notification.isRead ? " unread" : ""}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                onClick={() => !notification.isRead && handleMarkRead(notification._id)}
              >
                <div className={`notif-item__icon ${notification.meta.tone}`}>
                  {notification.meta.icon}
                </div>
                <div className="notif-item__body">
                  <div className="notif-item__topline">
                    <span className="notif-item__type">{notification.meta.label}</span>
                    <span className="notif-item__time">{notification.createdAt ? timeAgo(notification.createdAt) : ""}</span>
                  </div>
                  <div className="notif-item__title">{notification.displayTitle}</div>
                  <div className="notif-item__message">{notification.displayMessage}</div>
                </div>
                {!notification.isRead && <div className="notif-item__dot" />}
              </motion.button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
