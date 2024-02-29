import { NotificationType } from "@/enums";
import React, {
  FC,
  ReactNode,
  createContext,
  useEffect,
  useState,
} from "react";
import styles from "./Notifications.module.scss";

interface Notification {
  message: string;
  type: NotificationType;
}

interface NotificationProps {
  children: ReactNode;
}

interface NotificationContextValue {
  notifications: Notification[] | null;
  setNotifications: React.Dispatch<React.SetStateAction<Notification[] | null>>;
}

export const NotificationContext =
  createContext<NotificationContextValue | null>(null);

const Notifications: FC<NotificationProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[] | null>(
    null
  );

  const contextValue: NotificationContextValue = {
    notifications,
    setNotifications,
  };

  useEffect(() => {
    if (notifications) {
      const timer = setTimeout(() => {
        setNotifications(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notifications]);

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
      {notifications && (
        <div className={styles.notifications}>
          {notifications.map((notification: Notification, i: number) => (
            <div
              className={`${styles.notification} ${
                styles[`notification${notification.type}`]
              }`}
              key={i}
            >
              <p>{notification.message}</p>
            </div>
          ))}
        </div>
      )}
    </NotificationContext.Provider>
  );
};

export default Notifications;
